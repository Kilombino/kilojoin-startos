export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Kilojoin': 0,
  'BLAKE2b node': 1,
  'Waiting for the node to publish its RPC': 2,
  'not installed. Install it, or pick the other node with the action Choose BLAKE2b node': 3,
  'Web Interface': 4,
  'The web interface is ready': 5,
  'The web interface is not ready': 6,
  Notifications: 7,
  'Waiting for Kilojoin': 8,
  'Pool events show up as StartOS notifications': 9,
  'Update the BLAKE2b node: Kilojoin needs 1.0.0:30 or later, installed is': 12,
  'The BLAKE2b node is stopped': 13,

  // actions/chooseNode.ts
  'Automatic uses Bitcoin Knots (BLAKE2b) Companion if it is installed, otherwise Bitcoin (bitcoind). Kilojoin checks that the node follows the BLAKE2b chain before using it.': 14,
  Automatic: 15,
  'Choose BLAKE2b node': 16,
  'Which installed node Kilojoin reads the chain from': 17,

  // interfaces.ts
  'Web UI': 10,
  'Your wallet and your coinjoin pools': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
