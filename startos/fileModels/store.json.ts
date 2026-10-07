import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Which BLAKE2b node Kilojoin uses. 'auto' picks whichever is installed.
export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.main,
    subpath: '/startos-store.json',
  },
  z.looseObject({
    node: z.enum(['auto', 'knots-blake2b', 'bitcoind']).catch('auto'),
  }),
)
