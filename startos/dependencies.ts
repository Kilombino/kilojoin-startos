import { nodeDescription } from './manifest/i18n'
import { sdk } from './sdk'

// The BLAKE2b node, synced: Kilojoin scans its UTXO set for the wallet and checks every
// coin offered to a pool against it. A pruned node is enough (no txindex is needed).
const node = sdk.Dependency.required('knots-blake2b', {
  description: nodeDescription,
  metadata: {
    title: 'Bitcoin Knots (BLAKE2b)',
    icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png',
  },
  versionRange: '>=1.0.0:30',
  kind: 'running',
  healthChecks: ['node', 'sync-progress'],
})

export const dependencies = sdk.Dependencies.of().addDependency(node)
