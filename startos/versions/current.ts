import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.10.0:0',
  releaseNotes: {
    en_US:
      'Kilojoin v6: pools with asynchronous rounds, for people who answer at different times. Open one from the web page with "Asynchronous rounds": up to an hour to answer a vote, 30 minutes to hand in the outputs and two hours to sign. You can answer and come back only when your node has to act again; whoever holds every signature sends the transaction. Rounds are now kept on disk, so a restart of the service does not lose a round in progress. Same as Kilowallet 1.5.0. Pools v1 to v5 work as before.',
    es_ES:
      'Kilojoin v6: pools con rondas asíncronas, para gente que contesta a horas distintas. Ábrelo desde la página web con "Asynchronous rounds": hasta una hora para contestar a una votación, 30 minutos para entregar las salidas y dos horas para firmar. Puedes contestar y volver solo cuando tu nodo tenga que actuar otra vez; quien junta todas las firmas envía la transacción. Las rondas se guardan ahora en disco, así que reiniciar el servicio no pierde una ronda en curso. Igual que Kilowallet 1.5.0. Los pools v1 a v5 funcionan como antes.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
