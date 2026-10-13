import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.6.0:0',
  releaseNotes: {
    en_US:
      "One unlock per pool, as in Kilowallet 1.0. Sign on its own is now on by default: unlocking to open or join a pool is the only time it asks, and the round accepts closing and signs by itself, also after you lock the page (the keys of that round's coins stay in memory until it ends). The perfect (exact) coin now joins its pool, or opens the one you were setting up, by itself at its first confirmation. Security: a round closed with fewer people than the pool's minimum is never signed.",
    es_ES:
      'Un desbloqueo por pool, como en Kilowallet 1.0. Firmar solo viene ahora activado: desbloquear para abrir o unirte a un pool es la única vez que pregunta, y la ronda acepta el cierre y firma sola, también después de bloquear la página (las claves de las monedas de esa ronda quedan en memoria hasta que acaba). La moneda perfecta (exacta) entra ahora sola en su pool, o abre el que estabas preparando, al tener su primera confirmación. Seguridad: nunca se firma una ronda cerrada con menos gente que el mínimo del pool.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
