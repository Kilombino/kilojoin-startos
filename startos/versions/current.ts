import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.8.0:0',
  releaseNotes: {
    en_US:
      "Kilojoin v4, as in Kilowallet 1.2.0: whoever opens a pool now picks how many mixed outputs each person gets, 1 to 5. With 4 outputs of 1 000 000 sats, the perfect coin is 4 000 000 plus the fee, and each person gets four outputs of 1 000 000 to four unused addresses of their own. Each output is signed blindly and handed in on its own (its own key, connection and wait), so not even the creator can tell which outputs are the same person's. A pool of one output each is still announced as v3, so every v3 wallet can join it; only Kilowallet 1.2.0 and Kilojoin 0.8 or newer see pools of 2 to 5 outputs.",
    es_ES:
      'Kilojoin v4, como en Kilowallet 1.2.0: quien abre un pool elige ahora cuántas salidas mezcladas recibe cada persona, de 1 a 5. Con 4 salidas de 1 000 000 sats, la moneda perfecta es 4 000 000 más la comisión, y cada uno recibe cuatro salidas de 1 000 000 en cuatro direcciones suyas sin usar. Cada salida se firma a ciegas y se entrega por separado (su propia clave, conexión y espera), así que ni el creador sabe qué salidas son de la misma persona. Un pool de una salida por persona se sigue anunciando como v3 y cualquier cartera v3 puede unirse; los pools de 2 a 5 salidas solo los ven Kilowallet 1.2.0 y Kilojoin 0.8 o posteriores.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
