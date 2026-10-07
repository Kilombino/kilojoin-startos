import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.2:0',
  releaseNotes: {
    en_US:
      'The receive address stays on screen with a COPY button. During a vote: time left, and END POOL / LEAVE. When a vote runs out with too few yes, whoever did not answer is left out of the pool.',
    es_ES:
      'La dirección de recibir se queda en pantalla con botón COPY. Durante una votación: tiempo restante, y END POOL / LEAVE. Si la votación vence con pocos sí, quien no contestó queda fuera del pool.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
