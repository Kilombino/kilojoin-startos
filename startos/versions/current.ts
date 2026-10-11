import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.5.0:0',
  releaseNotes: {
    en_US:
      'Kilojoin v2, the same as Kilowallet 0.27: Taproot pools (bc1p coins and outputs only) and several coins per person, chosen with coin control. Kilojoin now also has a Taproot account (BIP-86) next to its native SegWit one, set up the next time you unlock it; you can receive on either, and sends can mix both. Every coin that joins a pool is checked against your node, script included. Native SegWit pools of one coin each still work with older versions.',
    es_ES:
      'Kilojoin v2, igual que Kilowallet 0.27: pools Taproot (solo monedas y salidas bc1p) y varias monedas por persona, elegidas con coin control. Kilojoin tiene ahora también una cuenta Taproot (BIP-86) junto a la native SegWit, que se crea la próxima vez que lo desbloquees; puedes recibir en las dos y los envíos pueden mezclarlas. Cada moneda que entra en un pool se comprueba contra tu nodo, script incluido. Los pools native SegWit de una moneda por persona siguen funcionando con versiones anteriores.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
