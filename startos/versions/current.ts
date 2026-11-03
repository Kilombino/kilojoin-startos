import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.3:0',
  releaseNotes: {
    en_US:
      'Opening a pool showed a yellow message, JSONObject["pool"] not found, although the pool was opened: right after opening it, the page also tried to join it as if it were a pool from the list. It no longer does. Pools opened with 0.9.2 are fine; if you pressed Open the pool again thinking it had failed, close the extra pool from In progress (nothing was signed, so no coin moves).',
    es_ES:
      'Al abrir un pool salía un mensaje amarillo, JSONObject["pool"] not found, aunque el pool sí se abría: justo después de abrirlo, la página intentaba además unirse a él como si fuera un pool de la lista. Ya no lo hace. Los pools abiertos con la 0.9.2 están bien; si pulsaste Open the pool otra vez pensando que había fallado, cierra el pool de más desde In progress (no se ha firmado nada, así que ninguna moneda se mueve).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
