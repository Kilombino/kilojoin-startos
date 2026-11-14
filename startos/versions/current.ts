import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.10.3:0',
  releaseNotes: {
    en_US:
      'New action "Delete wallet" (with Kilojoin stopped): removes the wallet from Kilojoin so you can create a new one or import another, for example the one in your Kilowallet, without reinstalling. Move your coins out and keep the words first. The Kilojoin app itself is unchanged (as 0.10.2).',
    es_ES:
      'Nueva acción "Borrar monedero" (con Kilojoin parado): quita el monedero de Kilojoin para crear uno nuevo o importar otro, por ejemplo el de tu Kilowallet, sin reinstalar. Antes saca las monedas y guarda las palabras. La app Kilojoin no cambia (igual que la 0.10.2).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
