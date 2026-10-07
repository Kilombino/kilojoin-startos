import { T } from '@start9labs/start-sdk'
import { dependencies } from './dependencies'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { chosenNode, nodeMount, nodes, uiPort } from './utils'

// What Kilojoin needs from either node's manifest (one of them is on an older SDK).
type NodeManifest = T.SDKManifest & {
  id: 'knots-blake2b' | 'bitcoind'
  volumes: ['main', 'i2pd']
}

type KjEvent = { at: number; title: string; text: string; pool: string }

const levelOf = (title: string) =>
  /confirmed/i.test(title)
    ? ('success' as const)
    : /refused|cancelled/i.test(title)
      ? ('warning' as const)
      : ('info' as const)

// Waits for the node to answer, then asks it, with its cookie, whether BLAKE2b is active:
// `bitcoind` is also the id of SHA256d Bitcoin. Refuses (exit 1) any other chain.
// (rc3 renamed getdeploymentinfo's top-level `hardfork` to `blake2b`; accept both.)
const chainGate = (rpc: string, label: string) => `
while :; do
  c="$(cat ${nodeMount}/.cookie 2>/dev/null)"
  r="$(curl -s -m 10 -u "$c" -H 'Content-Type: application/json' \
    --data-binary '{"jsonrpc":"1.0","id":"kj","method":"getdeploymentinfo","params":[]}' \
    http://${rpc}/)"
  if echo "$r" | grep -q '"result":{'; then
    echo "$r" | grep -Eq '"(blake2b|hardfork)":\{[^}]*"active":true' && exit 0
    echo "${label} is not on the BLAKE2b chain. Kilojoin only works on BLAKE2b."
    exit 1
  fi
  echo "Waiting for ${label} to answer RPC"
  sleep 15
done
`

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Kilojoin'))

  const nodeId = await chosenNode(effects)
  const node = nodes[nodeId]

  // The node's RPC over the LXC bridge. Null while the node publishes no binding;
  // .const() restarts main when it appears.
  const rpc = await sdk.host
    .getBridgeAddress(effects, {
      packageId: nodeId,
      hostId: node.rpcHostId,
      internalPort: node.rpcPort,
    })
    .const()
  if (!rpc) {
    return sdk.Daemons.of(effects).addHealthCheck('node-rpc', {
      ready: {
        display: i18n('BLAKE2b node'),
        gracePeriod: 0,
        trigger: sdk.trigger.cooldownTrigger(30_000),
        fn: async () => {
          // Say exactly what is missing: StartOS's own "unmet dependencies" does not.
          const check = await dependencies.check(effects, [nodeId])
          const installed = check.infoFor(nodeId).result.installedVersion
          if (!installed)
            return {
              result: 'loading',
              message: `${node.title} (${nodeId}): ${i18n('not installed. Install it, or pick the other node with the action Choose BLAKE2b node')}`,
            }
          if (!check.installedVersionSatisfied(nodeId))
            return {
              result: 'failure',
              message: `${i18n('Update the BLAKE2b node: Kilojoin needs 1.0.0:30 or later, installed is')} ${installed}`,
            }
          if (!check.runningSatisfied(nodeId))
            return {
              result: 'loading',
              message: i18n('The BLAKE2b node is stopped'),
            }
          return {
            result: 'loading',
            message: i18n('Waiting for the node to publish its RPC'),
          }
        },
      },
      requires: [],
    })
  }

  const sub = await sdk.SubContainer.of(
    effects,
    { imageId: 'kilojoin' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      })
      // Read-only, for the RPC cookie: no password is generated, stored or handed around.
      .mountDependency<NodeManifest>({
        dependencyId: nodeId,
        volumeId: 'main',
        subpath: null,
        mountpoint: nodeMount,
        readonly: true,
      }),
    'kilojoin',
  )

  // Events the app raised since main started (new pools, a vote, time to sign, a
  // confirmation), turned into StartOS notifications. Polled from inside the container:
  // the endpoint answers loopback only.
  let since = Date.now()

  return sdk.Daemons.of(effects)
    .addOneshot('chain', {
      subcontainer: sub,
      // Waits for the node to answer, then refuses anything but the BLAKE2b chain.
      exec: {
        command: ['sh', '-c', chainGate(rpc, `${node.title} (${nodeId})`)],
      },
      requires: [],
    })
    .addDaemon('kilojoin', {
      subcontainer: sub,
      exec: {
        command: ['java', '-Xmx256m', '-jar', '/opt/kilojoin/kilojoin.jar'],
        env: {
          KILOJOIN_DATA: '/data',
          KILOJOIN_PORT: String(uiPort),
          BITCOIN_RPC_URL: `http://${rpc}/`,
          BITCOIN_RPC_COOKIE: `${nodeMount}/.cookie`,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chain'],
    })
    .addHealthCheck('notifications', {
      ready: {
        display: i18n('Notifications'),
        gracePeriod: 0,
        trigger: sdk.trigger.cooldownTrigger(20_000),
        fn: async () => {
          const r = await sub.exec([
            'curl',
            '--fail',
            '--silent',
            '--max-time',
            '10',
            `http://127.0.0.1:${uiPort}/internal/events?since=${since}`,
          ])
          if (r.exitCode !== 0)
            return { result: 'loading', message: i18n('Waiting for Kilojoin') }
          let events: KjEvent[] = []
          try {
            events = JSON.parse(r.stdout.toString()) as KjEvent[]
          } catch {
            return { result: 'loading', message: i18n('Waiting for Kilojoin') }
          }
          // Oldest first, so the panel (newest on top) reads in order.
          for (const e of events.sort((a, b) => a.at - b.at)) {
            since = Math.max(since, e.at)
            await sdk.notification.create(effects, {
              level: levelOf(e.title),
              title: e.title,
              message: e.text,
            })
          }
          return {
            result: 'success',
            message: i18n('Pool events show up as StartOS notifications'),
          }
        },
      },
      requires: ['kilojoin'],
    })
})
