import { domain } from './dns'
import { isPermanentStage } from './stage'

export const website = new sst.aws.Astro('Website', {
  path: 'apps/website',
  buildCommand: 'bun run build',
  domain: {
    name: domain,
    dns: sst.aws.dns(),
    redirects: isPermanentStage ? [`www.${domain}`] : undefined,
  },
})
