import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.6.2:0',
  releaseNotes: {
    en_US:
      "A coinjoin round whose pool's creator had gone (its app closed) could stay in progress for good, stuck at the closing vote even after the pool expired. Now a vote also ends with the pool's expiry, the others give up three minutes past its deadline if the creator neither closed nor reopened it, and a pool its creator has not re-announced for 35 minutes is let go. The round goes to the history; your coin never left.",
    es_ES:
      'Una ronda de coinjoin cuyo creador se había ido (su app cerrada) podía quedarse en curso para siempre, atascada en la votación de cierre incluso con el pool ya caducado. Ahora una votación también termina cuando caduca el pool, los demás se retiran a los tres minutos del plazo si el creador no cerró ni reabrió, y un pool que su creador lleva 35 minutos sin anunciar se suelta. La ronda pasa al historial; tu moneda nunca salió.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
