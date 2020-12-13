import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'seanpaulcampbell-website-edge-lambda',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    domainName: 'seanpaulcampbell.com',
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-pseudo-parameters',
    'serverless-iam-roles-per-function',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-1',
    stage: 'production',
    tags: {
      Application: 'seanpaulcampbell.com-website',
    },
    environment: {
      DOMAIN_NAME: 'seanpaulcampbell.com',
      REDIRECT_DOMAIN_NAME: 'www.seanpaulcampbell.com',
    },
  },
  functions: {
    viewerRequest: {
      handler: 'viewerRequest.handler',
      events: [
        {
          cloudFront: {
            eventType: 'viewer-request',
            origin: '',
          },
        },
      ],
      memorySize: 128,
      timeout: 5,
    },
  },
}

module.exports = serverlessConfiguration
