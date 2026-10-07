import { sdk } from './sdk'

// vault.json (the words, encrypted with the user's password), the wallet's address indexes
// and any round in progress.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) => sdk.Backups.ofVolumes('main'),
)
