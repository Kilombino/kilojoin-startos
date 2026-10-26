import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.1:0',
  releaseNotes: {
    en_US:
      'The balance is read from your node, which walks its whole UTXO set: on a small machine that can take many minutes, and when it took over 10 minutes or two scans met, the balance stayed at 0 with no word why. Now there is one scan at a time for both accounts (bc1q and bc1p together, half the time), with no short timeout; the screen shows how far the node is and any error, and the log says when each scan starts and ends. Asking for a bc1q address no longer waits for a scan to end.',
    es_ES:
      'El saldo se lee de tu nodo, que recorre todo su conjunto de monedas sin gastar: en un equipo pequeño puede tardar muchos minutos, y si pasaba de 10 o coincidían dos recorridos, el saldo se quedaba en 0 sin decir por qué. Ahora hay un solo recorrido a la vez para las dos cuentas (bc1q y bc1p juntas, la mitad de tiempo), sin límite corto; la pantalla muestra por dónde va el nodo y cualquier error, y el log dice cuándo empieza y acaba cada recorrido. Pedir una dirección bc1q ya no espera a que acabe un recorrido.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
