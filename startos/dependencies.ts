import { nodeDescription } from './manifest/i18n'
import { sdk } from './sdk'
import { chosenNode } from './utils'

// One BLAKE2b node, synced: Kilojoin scans its UTXO set for the wallet and checks every
// coin offered to a pool against it. A pruned node is enough (no txindex is needed).
const companion = sdk.Dependency.optional('knots-blake2b', {
  description: nodeDescription,
  metadata: {
    title: 'Bitcoin Knots (BLAKE2b) Companion',
    icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png',
  },
  versionRange: '>=1.0.0:30',
  kind: 'running',
  healthChecks: ['node', 'sync-progress'],
  enabled: async ({ effects }) =>
    (await chosenNode(effects)) === 'knots-blake2b',
})

const bitcoind = sdk.Dependency.optional('bitcoind', {
  description: nodeDescription,
  metadata: {
    title: 'Bitcoin',
    icon: 'https://raw.githubusercontent.com/Retropex/knots-startos/POW/icon.png',
  },
  versionRange: '*',
  kind: 'running',
  healthChecks: ['bitcoind', 'sync-progress'],
  enabled: async ({ effects }) => (await chosenNode(effects)) === 'bitcoind',
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(companion)
  .addDependency(bitcoind)
