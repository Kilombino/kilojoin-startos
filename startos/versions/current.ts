import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.0:1',
  releaseNotes: {
    en_US:
      'When the BLAKE2b node is missing, the health check says why: not installed, too old (with the installed version) or stopped.',
    es_ES:
      'Cuando falta el nodo BLAKE2b, la comprobación de salud dice por qué: no instalado, demasiado viejo (con la versión instalada) o parado.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
