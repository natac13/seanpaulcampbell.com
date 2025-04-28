/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'seanpaulcampbell',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: 'natac',
          region: 'us-east-2',
        },
      },
    }
  },
  async run() {
    const outputs = {}
    const { readdirSync } = await import('node:fs')
    for (const value of readdirSync('./infra/')) {
      const result = await import(`./infra/${value}`)
      if (result.outputs) Object.assign(outputs, result.outputs)
    }
    return outputs
  },
})
