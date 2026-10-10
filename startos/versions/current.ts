import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.4.0:0',
  releaseNotes: {
    en_US:
      'When a pool you are in has under an hour left and enough people to close, you are told (StartOS, Telegram and the web page), so you can ask to close before it expires. A closed round now announces only the people in it. New option in the web page: a sound and a browser notification on every pool event while the page is open. Open pools start at 1 sat/vB.',
    es_ES:
      'Cuando a un pool en el que estás le queda menos de una hora y ya sois suficientes para cerrar, te avisa (StartOS, Telegram y la página web), para que pidas el cierre antes de que caduque. Una ronda cerrada anuncia ahora solo a quienes están en ella. Opción nueva en la página web: un sonido y una notificación del navegador en cada aviso de los pools mientras la página está abierta. Los pools nuevos empiezan en 1 sat/vB.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
