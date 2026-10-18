import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.7.0:0',
  releaseNotes: {
    en_US:
      "Kilojoin v3, as in Kilowallet 1.1.5: every pool you open now has blind outputs. When a round closes, each member's mixed output is signed blindly by the pool's creator and handed in from a fresh key, so nobody (not the relay, the other members, or the creator) can tell whose output is whose. Only the creator's own key runs the pool, votes and leaving are proven with a code tied to each seat, and every member checks every seat's coins against the chain. v1 and v2 pools still join as before; wallets older than Kilowallet 1.1.5 or Kilojoin 0.7 don't see v3 pools.",
    es_ES:
      'Kilojoin v3, como en Kilowallet 1.1.5: todos los pools que abras tienen ahora salidas ciegas. Al cerrar una ronda, el creador del pool firma a ciegas la salida mezclada de cada miembro, y cada uno la entrega desde una clave nueva, así que nadie (ni el relay, ni los demás miembros, ni el creador) puede saber qué salida es de quién. Solo la clave propia del creador dirige el pool, los votos y las salidas se demuestran con un código ligado a cada asiento, y cada miembro comprueba las monedas de todos los asientos contra la cadena. Los pools v1 y v2 se siguen uniendo como antes; las carteras anteriores a Kilowallet 1.1.5 o Kilojoin 0.7 no ven los pools v3.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
