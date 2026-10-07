import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:0',
  releaseNotes: {
    en_US:
      'First release: wallet from your words, pools on relay.kilombino.com, StartOS notifications.',
    es_ES:
      'Primera versión: wallet con tus palabras, pools en relay.kilombino.com, notificaciones de StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
