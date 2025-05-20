/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'convex-self-hosted',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          profile: 'conkoa-dev',
        },
      },
    }
  },
  async run() {
    const vpc = new sst.aws.Vpc('Vpc') // you can add a `bastion` if you want
    const cluster = new sst.aws.Cluster('Cluster', {
      vpc,
    })

    const database = new sst.aws.Mysql('Database', {
      vpc,
      database: 'convex_self_hosted',
      dev: {
        database: 'convex_self_hosted',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
      },
    })

    const baseDomain = 'convex-self-hosted.dev.conkoa.ai'
    const domain = $dev ? `${$app.stage}.${baseDomain}` : baseDomain

    const exportsBucket = new sst.aws.Bucket('ExportsBucket', {})
    const snapshotImportsBucket = new sst.aws.Bucket('SnapshotImportsBucket', {})
    const modulesBucket = new sst.aws.Bucket('ModulesBucket', {})
    const filesBucket = new sst.aws.Bucket('FilesBucket', {})
    const searchBucket = new sst.aws.Bucket('SearchBucket', {})

    const convexUser = new aws.iam.User('ConvexUser')
    const convexUserPolicy = new aws.iam.UserPolicy('ConvexUserPolicy', {
      user: convexUser.name,
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'ExportsBucketAccess',
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [exportsBucket.arn, $interpolate`${exportsBucket.arn}/*`],
          },
          {
            Sid: 'SnapshotImportsBucketAccess',
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [snapshotImportsBucket.arn, $interpolate`${snapshotImportsBucket.arn}/*`],
          },
          {
            Sid: 'ModulesBucketAccess',
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [modulesBucket.arn, $interpolate`${modulesBucket.arn}/*`],
          },
          {
            Sid: 'FilesBucketAccess',
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [filesBucket.arn, $interpolate`${filesBucket.arn}/*`],
          },
          {
            Sid: 'SearchBucketAccess',
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [searchBucket.arn, $interpolate`${searchBucket.arn}/*`],
          },
        ],
      },
    })
    const convexUserAccessKey = new aws.iam.AccessKey('ConvexUserAccessKey', {
      user: convexUser.name,
    })

    const convex = new sst.aws.Service('Convex', {
      cluster,
      image: 'ghcr.io/get-convex/convex-backend:5143fec81f146ca67495c12c6b7a15c5802c37e2',
      cpu: '0.5 vCPU',
      memory: '1 GB',
      scaling: {
        min: 1,
        max: 1,
      },
      link: [
        database,
        exportsBucket,
        snapshotImportsBucket,
        modulesBucket,
        filesBucket,
        searchBucket,
      ],
      health: {
        command: ['curl', '-f', 'http://localhost:3210/version'],
        startPeriod: '10 seconds',
        timeout: '10 seconds',
        interval: '1 minute',
        retries: 3,
      },
      loadBalancer: {
        domain: {
          name: domain,
          aliases: [`api.${domain}`],
          dns: sst.aws.dns(),
        },
        health: {
          '3210/http': {
            path: '/version',
            interval: '1 minute',
            timeout: '10 seconds',
          },
          '3211/http': {
            path: '/version',
            interval: '1 minute',
            timeout: '10 seconds',
          },
        },
        rules: [
          {
            listen: '3210/https',
            forward: '3210/http',
          },
          {
            listen: '3211/https',
            forward: '3211/http',
          },
        ],
      },
      environment: {
        S3_STORAGE_EXPORTS_BUCKET: exportsBucket.name,
        S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: snapshotImportsBucket.name,
        S3_STORAGE_MODULES_BUCKET: modulesBucket.name,
        S3_STORAGE_FILES_BUCKET: filesBucket.name,
        S3_STORAGE_SEARCH_BUCKET: searchBucket.name,
        REDACT_LOGS_TO_CLIENT: 'true',
        ...($dev
          ? {
              MYSQL_URL: $interpolate`mysql://${database.username}:${database.password}@host.docker.internal:${database.port}`,
              CONVEX_CLOUD_ORIGIN: 'http://127.0.0.1:3210',
              CONVEX_SITE_ORIGIN: 'http://127.0.0.1:3211',
              DO_NOT_REQUIRE_SSL: 'true',
              DISABLE_BEACON: 'true',
            }
          : {
              MYSQL_URL: $interpolate`mysql://${database.username}:${database.password}@${database.host}:${database.port}`,
              CONVEX_CLOUD_ORIGIN: $interpolate`https://${domain}:3210`,
              CONVEX_SITE_ORIGIN: $interpolate`https://${domain}:3211`,
              DO_NOT_REQUIRE_SSL: 'true',
              AWS_ACCESS_KEY_ID: convexUserAccessKey.id,
              AWS_SECRET_ACCESS_KEY: convexUserAccessKey.secret,
            }),
      },
      dev: {
        url: 'http://127.0.0.1:3210',
        command: 'bun run scripts/docker-backend.ts',
      },
      transform: {
        service: {
          enableExecuteCommand: true,
        },
      },
    })

    const dashboard = new sst.aws.Service('Dashboard', {
      cluster,
      image: 'ghcr.io/get-convex/convex-dashboard:5143fec81f146ca67495c12c6b7a15c5802c37e2',
      environment: {
        NEXT_PUBLIC_DEPLOYMENT_URL: $dev
          ? 'http://127.0.0.1:3210'
          : $interpolate`https://${domain}:3210`,
      },
      link: [convex],
      dev: {
        url: 'http://127.0.0.1:6791',
        command: 'bun run scripts/docker-dashboard.ts',
      },
      serviceRegistry: {
        port: 6791,
      },
      cpu: '0.25 vCPU',
      memory: '0.5 GB',
    })

    if (!$dev) {
      const api = new sst.aws.ApiGatewayV2('Api', {
        vpc,
        domain: {
          name: `dashboard.${domain}`,
          dns: sst.aws.dns(),
        },
      })
      api.routePrivate('$default', dashboard.nodes.cloudmapService.arn)
    }

    const convexDev = new sst.x.DevCommand(
      'ConvexDevServer',
      { dev: { command: 'bun run convex dev' } },
      { dependsOn: [convex] },
    )

    const site = new sst.aws.StaticSite('Site', {
      dev: {
        command: 'bun run dev',
        url: 'http://127.0.0.1:5173',
      },
      build: {
        command: 'bun run build',
        output: './dist',
      },
      environment: {
        VITE_CONVEX_URL: $dev ? 'http://127.0.0.1:3210' : $interpolate`https://${domain}:3210`,
      },
      domain: {
        name: `static.${domain}`,
        dns: sst.aws.dns(),
      },
    })
  },
})
