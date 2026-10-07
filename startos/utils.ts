export const uiPort = 8080

/** Where the node's volume is mounted, read-only, to read its RPC cookie. */
export const nodeMount = '/mnt/node'

// The knots-blake2b package's stable contract for dependents (its startos/utils.ts:
// `rpcHostId`, `rpcPort`). Copied rather than imported: that package is on SDK 2.
export const nodeRpcHostId = 'rpc'
export const nodeRpcPort = 18443
