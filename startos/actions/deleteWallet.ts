import { rm } from 'node:fs/promises'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// Kilojoin keeps one wallet per install. This removes it (the encrypted seed words, the
// address state and the pool sessions), so the next time the web UI opens it asks to create
// or import a wallet again. Settings (Telegram, etc.) stay.
const WALLET_FILES = [
  'vault.json',
  'wallet.json',
  'wallet-tr.json',
  'sessions.json',
  'sessions.json.tmp',
]

export const deleteWallet = sdk.Action.withoutInput(
  'delete-wallet',
  async () => ({
    name: i18n('Delete wallet'),
    description: i18n(
      'Removes the wallet from Kilojoin so you can create or import another one',
    ),
    warning: i18n(
      'This deletes the seed words stored in Kilojoin. Before you go on: move every coin out and make sure you have the words written down. Without the words, coins left in this wallet are lost.',
    ),
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),
  async () => {
    for (const f of WALLET_FILES) {
      await rm(sdk.volumes.main.subpath(f), { force: true })
    }
    return {
      version: '1',
      title: i18n('Wallet deleted'),
      message: i18n(
        'Start Kilojoin and open its web interface: it will ask you to create a new wallet or import one with its words.',
      ),
      result: null,
    }
  },
)
