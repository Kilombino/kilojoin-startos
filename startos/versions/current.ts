import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.1:0',
  releaseNotes: {
    en_US:
      'Works with either BLAKE2b node: Bitcoin Knots (BLAKE2b) Companion (knots-blake2b) or Bitcoin (bitcoind) on the BLAKE2b chain, picked automatically or with the action Choose BLAKE2b node. Kilojoin checks that the node is on BLAKE2b before starting.',
    es_ES:
      'Funciona con cualquiera de los dos nodos BLAKE2b: Bitcoin Knots (BLAKE2b) Companion (knots-blake2b) o Bitcoin (bitcoind) en la cadena BLAKE2b, elegido solo o con la acción Elegir nodo BLAKE2b. Kilojoin comprueba que el nodo está en BLAKE2b antes de arrancar.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
