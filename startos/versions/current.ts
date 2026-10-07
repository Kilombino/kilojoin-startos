import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.0:0',
  releaseNotes: {
    en_US:
      'SEND with coin control (mixed coins stay apart, the review warns), PREPARE AN EXACT COIN for a pool, coins labelled mixed or change, and the wallet rescans by itself after a round and every 10 minutes.',
    es_ES:
      'ENVIAR con control de monedas (las mezcladas aparte, la revisión avisa), PREPARAR una moneda exacta para un pool, monedas etiquetadas como mezcladas o cambio, y la wallet se reescanea sola tras una ronda y cada 10 minutos.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
