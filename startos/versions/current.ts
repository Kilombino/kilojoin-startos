import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.10.1:0',
  releaseNotes: {
    en_US:
      'Coinjoin rounds are safer after you sign: the coins of a round you signed stay reserved until its transaction confirms, or until a coin of the round is spent elsewhere and that spend is 6 blocks deep (a spend still in the mempool, or a block or two deep, no longer frees them). A round counts as confirmed only after 6 blocks, and if a reorganisation drops its transaction it is sent again. A failed broadcast no longer cancels the round, and a transaction not seen for 12 hours is no longer given up: it is sent again until a node takes it. This applies to every pool. In asynchronous (v6) pools a node that signed posts its signatures again every day, and a new vote opens by itself only when a whole round still fits before the pool ends. Same protocol: works with Kilojoin 0.10.0, Kilowallet 1.5.0 and other v6 wallets. Same as Kilowallet 1.5.1.',
    es_ES:
      'Las rondas de coinjoin son más seguras después de firmar: las monedas de una ronda que firmaste siguen reservadas hasta que su transacción confirma, o hasta que una moneda de la ronda se gasta en otra transacción con 6 bloques encima (un gasto aún en la mempool, o con uno o dos bloques, ya no las libera). Una ronda cuenta como confirmada solo tras 6 bloques, y si una reorganización tira su transacción, se envía de nuevo. Un envío fallido ya no cancela la ronda, y una transacción que no aparece en 12 horas ya no se abandona: se reenvía hasta que un nodo la acepta. Vale para todos los pools. En los pools asíncronos (v6) un nodo que firmó vuelve a publicar sus firmas cada día, y una votación nueva se abre sola solo si aún cabe una ronda entera antes del final del pool. Mismo protocolo: funciona con Kilojoin 0.10.0, Kilowallet 1.5.0 y otras carteras v6. Igual que Kilowallet 1.5.1.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
