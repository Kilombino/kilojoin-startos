import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'

export const uiPort = 8080

/** Where the node's volume is mounted, read-only, to read its RPC cookie. */
export const nodeMount = '/mnt/node'

export type NodeId = 'knots-blake2b' | 'bitcoind'

/**
 * The two BLAKE2b nodes packaged for StartOS. Each one's contract for dependents,
 * copied from its startos/utils.ts rather than imported (knots-blake2b is on SDK 2):
 * RPC host `rpc` and its port, and `.cookie` at the root of its `main` volume.
 *  - knots-blake2b: paulscode's companion, beside the official bitcoind (port 18443).
 *  - bitcoind: Retropex's Knots, POW branch (Luke's BLAKE2b Knots), port 8332. The same
 *    id also carries SHA256d Bitcoin, so main checks the chain before using it.
 */
export const nodes: Record<
  NodeId,
  { title: string; rpcHostId: string; rpcPort: number; ready: string }
> = {
  'knots-blake2b': {
    title: 'Bitcoin Knots (BLAKE2b) Companion',
    rpcHostId: 'rpc',
    rpcPort: 18443,
    ready: 'node',
  },
  bitcoind: {
    title: 'Bitcoin (BLAKE2b)',
    rpcHostId: 'rpc',
    rpcPort: 8332,
    ready: 'bitcoind',
  },
}

/** The node in use: the one chosen, or with 'auto' the companion if installed, else bitcoind. */
export async function chosenNode(effects: T.Effects): Promise<NodeId> {
  const choice = (await storeJson.read((s) => s.node).const(effects)) ?? 'auto'
  if (choice !== 'auto') return choice
  const installed = await effects.getInstalledPackages()
  if (installed.includes('knots-blake2b')) return 'knots-blake2b'
  if (installed.includes('bitcoind')) return 'bitcoind'
  return 'knots-blake2b'
}
