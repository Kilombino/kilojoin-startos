import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.2:0',
  releaseNotes: {
    en_US:
      "As in Kilowallet 1.3.9. Coinjoin rounds that timed out after everyone agreed: when a vote ended by its deadline or a last yes came in just then, the pool's creator could close it twice with two round ids, the others kept the first one, nobody got a blind signature, and the round was cancelled after five minutes (no coin moved). A vote now closes once, and a member waiting for its blind signature follows a later closing from the same creator, so rounds also go through with creators on older versions. Also: a seat whose coin was spent after joining is taken out of the pool instead of making every newcomer leave; a member that can't reach the chain keeps its seat; a seat that falls asleep as the round closes is left out and the round closes again with the rest; a seat taken back is not announced again as someone joining.",
    es_ES:
      'Como en Kilowallet 1.3.9. Rondas de coinjoin que caducaban después de que todos aceptaran: cuando una votación acababa por tiempo o llegaba justo entonces el último sí, el creador del pool podía cerrarlo dos veces con dos números de ronda, los demás se quedaban con el primero, nadie recibía su firma ciega y la ronda se cancelaba a los cinco minutos (sin mover ninguna moneda). Ahora una votación cierra una sola vez, y quien espera su firma ciega sigue un cierre posterior del mismo creador, así que también funcionan los pools de creadores con versiones anteriores. Además: un asiento cuya moneda se gastó después de unirse sale del pool en vez de hacer que cada recién llegado se vaya; quien no puede consultar la cadena conserva su asiento; un asiento que se duerme al cerrarse la ronda se queda fuera y la ronda vuelve a cerrarse con el resto; un asiento recuperado no se anuncia otra vez como alguien que se une.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
