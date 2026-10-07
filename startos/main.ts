import { T } from '@start9labs/start-sdk'
import { dependencies } from './dependencies'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { nodeMount, nodeRpcHostId, nodeRpcPort, uiPort } from './utils'

// What Kilojoin needs from the node's manifest (that package is built on an older SDK).
type NodeManifest = T.SDKManifest & {
  id: 'knots-blake2b'
  volumes: ['main', 'i2pd']
}

type KjEvent = { at: number; title: string; text: string; pool: string }

const levelOf = (title: string) =>
  /confirmed/i.test(title)
    ? ('success' as const)
    : /refused|cancelled/i.test(title)
      ? ('warning' as const)
      : ('info' as const)

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Kilojoin'))

  // The node's RPC over the LXC bridge. Null while the node publishes no binding;
  // .const() restarts main when it appears.
  const rpc = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'knots-blake2b',
      hostId: nodeRpcHostId,
      internalPort: nodeRpcPort,
    })
    .const()
  if (!rpc) {
    return sdk.Daemons.of(effects).addHealthCheck('node-rpc', {
      ready: {
        display: i18n('BLAKE2b node'),
        gracePeriod: 0,
        trigger: sdk.trigger.cooldownTrigger(60_000),
        fn: async () => {
          // Say exactly what is missing: StartOS's own "unmet dependencies" does not.
          const check = await dependencies.check(effects, ['knots-blake2b'])
          const installed =
            check.infoFor('knots-blake2b').result.installedVersion
          if (!installed)
            return {
              result: 'loading',
              message: i18n('The BLAKE2b node is not installed'),
            }
          if (!check.installedVersionSatisfied('knots-blake2b'))
            return {
              result: 'failure',
              message: `${i18n('Update the BLAKE2b node: Kilojoin needs 1.0.0:30 or later, installed is')} ${installed}`,
            }
          if (!check.runningSatisfied('knots-blake2b'))
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
        dependencyId: 'knots-blake2b',
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
      requires: [],
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
