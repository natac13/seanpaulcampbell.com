/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'openauth-react-router',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          profile: 'bc-sandbox',
        },
      },
    }
  },
  async run() {
    const secrets = {
      GITHUB_CLIENT_ID: new sst.Secret('GITHUB_CLIENT_ID'),
      GITHUB_CLIENT_SECRET: new sst.Secret('GITHUB_CLIENT_SECRET'),
    }
    const allSecrets = Object.values(secrets)

    const auth = new sst.aws.Auth('AuthServer', {
      issuer: {
        handler: './packages/functions/src/auth/issuer.handler',
        environment: {
          AUTH_FRONTEND_URL: 'http://localhost:5173',
        },
        link: [...allSecrets],
      },
    })

    new sst.aws.React('Web', {
      environment: {
        VITE_AUTH_URL: auth.url,
        VITE_SITE_URL: 'http://localhost:5173',
      },
    })
  },
})
