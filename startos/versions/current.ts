import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.0:0',
  releaseNotes: {
    en_US:
      "Kilojoin v5, as in Kilowallet 1.3.0: payment pools are listed and joined, and every member checks the creator's payments before signing. SEND takes several recipients and can pay them through a new pool: equal amounts make a pool whose outputs for you go to the recipients, different ones a payment pool, where the others put in the same total and get it back in equal outputs; nothing is paid until the pool closes, and BACK returns to SEND as it was. Open a pool from your coins: tick whole coins and the amount is worked out so there is no change. The pool minimum is now per person in all (2 × 5 000 is a pool, 3 × 3 000 only a test). Only Kilowallet 1.2.7 and Kilojoin 0.9 or newer see payment pools.",
    es_ES:
      'Kilojoin v5, como en Kilowallet 1.3.0: los pools de pago se listan y se unen, y cada miembro comprueba los pagos del creador antes de firmar. ENVIAR admite varios destinatarios y puede pagarles a través de un pool nuevo: importes iguales abren un pool cuyas salidas para ti van a los destinatarios; importes distintos, un pool de pago, donde los demás ponen el mismo total y lo recuperan en salidas iguales; no se paga nada hasta que el pool se cierra, y ATRÁS vuelve a ENVIAR tal como estaba. Abrir un pool con tus monedas: marca monedas enteras y el importe se calcula para que no haya cambio. El mínimo de un pool es ahora por persona en total (2 × 5 000 es un pool, 3 × 3 000 solo una prueba). Los pools de pago solo los ven Kilowallet 1.2.7 y Kilojoin 0.9 o posteriores.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
