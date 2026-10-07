import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'kilojoin',
  title: 'Kilojoin',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/Kilombino/kilojoin-startos',
  upstreamRepo: 'https://github.com/Kilombino/kilojoin',
  marketingUrl: 'https://github.com/Kilombino/kilowallet',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    kilojoin: {
      source: {
        dockerBuild: {
          dockerfile: 'kilojoin/Dockerfile',
          workdir: 'kilojoin',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
