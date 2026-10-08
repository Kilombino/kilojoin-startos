import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.3.0:0',
  releaseNotes: {
    en_US:
      'Pool events can also reach you on Telegram, with sound, through your own bot (settings in the web interface). New option: accept close requests and sign on its own, only when the final transaction checks out and while Kilojoin is unlocked.',
    es_ES:
      'Los avisos de los pools también pueden llegarte por Telegram, con sonido, a través de tu propio bot (ajustes en la interfaz web). Opción nueva: aceptar los cierres y firmar solo, únicamente cuando la transacción final cuadra y mientras Kilojoin está desbloqueado.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
