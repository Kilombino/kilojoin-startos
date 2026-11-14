import { sdk } from '../sdk'
import { chooseNode } from './chooseNode'
import { deleteWallet } from './deleteWallet'

export const actions = sdk.Actions.of()
  .addAction(chooseNode)
  .addAction(deleteWallet)
