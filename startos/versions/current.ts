import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.6.1:0',
  releaseNotes: {
    en_US:
      "Coinjoin as in the Kilowallet app: JOIN, IN PROGRESS and HISTORY tabs, and a compact card per round with the bar of its five steps (people, closing vote, signatures, sent, confirmed), what is happening and where your coin is. Tap a card for its details and buttons; it opens by itself when the round waits on you. Includes 0.6.0: one unlock per pool, the perfect coin joins by itself, rounds under the pool's minimum never signed.",
    es_ES:
      'Coinjoin como en la app Kilowallet: pestañas JOIN, IN PROGRESS y HISTORY, y una tarjeta compacta por ronda con la barra de sus cinco pasos (gente, votación, firmas, enviado, confirmado), lo que está pasando y dónde está tu moneda. Toca una tarjeta para ver el detalle y los botones; se abre sola cuando la ronda espera por ti. Incluye 0.6.0: un desbloqueo por pool, la moneda perfecta entra sola, nunca se firma una ronda con menos gente que el mínimo.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
