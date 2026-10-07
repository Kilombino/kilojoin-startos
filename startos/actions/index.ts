import { sdk } from '../sdk'
import { chooseNode } from './chooseNode'

export const actions = sdk.Actions.of().addAction(chooseNode)
