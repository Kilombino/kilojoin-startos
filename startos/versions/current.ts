import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.1:0',
  releaseNotes: {
    en_US:
      'Pools whose creator has closed the app are no longer listed (open pools are re-announced every 10 minutes); same coinjoin code as Kilowallet 0.22.1.',
    es_ES:
      'Los pools cuyo creador ha cerrado la app ya no salen en la lista (los abiertos se reanuncian cada 10 minutos); mismo código de coinjoin que Kilowallet 0.22.1.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
