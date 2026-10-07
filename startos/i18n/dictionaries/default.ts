export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Kilojoin': 0,
  'BLAKE2b node': 1,
  'Waiting for the node to publish its RPC': 2,
  'The BLAKE2b node is not installed': 3,
  'Web Interface': 4,
  'The web interface is ready': 5,
  'The web interface is not ready': 6,
  Notifications: 7,
  'Waiting for Kilojoin': 8,
  'Pool events show up as StartOS notifications': 9,

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
