import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  node: Value.select({
    name: i18n('BLAKE2b node'),
    description: i18n(
      'Automatic uses Bitcoin Knots (BLAKE2b) Companion if it is installed, otherwise Bitcoin (bitcoind). Kilojoin checks that the node follows the BLAKE2b chain before using it.',
    ),
    values: {
      auto: i18n('Automatic'),
      'knots-blake2b': 'Bitcoin Knots (BLAKE2b) Companion (knots-blake2b)',
      bitcoind: 'Bitcoin (bitcoind)',
    },
    default: 'auto',
  }),
})

export const chooseNode = sdk.Action.withInput(
  'choose-node',
  {
    name: i18n('Choose BLAKE2b node'),
    description: i18n('Which installed node Kilojoin reads the chain from'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  inputSpec,
  async ({ effects }) => ({
    node: (await storeJson.read((s) => s.node).once()) ?? 'auto',
  }),
  async ({ effects, input }) => {
    await storeJson.merge(effects, { node: input.node })
  },
)
