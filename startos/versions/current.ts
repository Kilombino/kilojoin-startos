import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.10.4:0',
  releaseNotes: {
    en_US:
      'Kilojoin 0.10.3: a coin you just sent leaves the balance and the coin list right away (shown as being sent until its transaction confirms) instead of staying there until the next block. Includes the action "Delete wallet" of 0.10.3:0 (with Kilojoin stopped) to create or import another wallet without reinstalling.',
    es_ES:
      'Kilojoin 0.10.3: una moneda que acabas de enviar sale del saldo y de la lista al momento (se muestra como enviándose hasta que su transacción confirma) en vez de quedarse hasta el siguiente bloque. Incluye la acción "Borrar monedero" de la 0.10.3:0 (con Kilojoin parado) para crear o importar otro monedero sin reinstalar.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
