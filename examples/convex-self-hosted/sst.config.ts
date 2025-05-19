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

    const exportsBucket = new sst.aws.Bucket('ExportsBucket', {})
    const snapshotImportsBucket = new sst.aws.Bucket('SnapshotImportsBucket', {})
    const modulesBucket = new sst.aws.Bucket('ModulesBucket', {})
    const filesBucket = new sst.aws.Bucket('FilesBucket', {})
    const searchBucket = new sst.aws.Bucket('SearchBucket', {})

    const convex = new sst.aws.Service('Convex', {
      cluster,
      image: 'ghcr.io/get-convex/convex-backend:5143fec81f146ca67495c12c6b7a15c5802c37e2',
      cpu: '1 vCPU',
      memory: '2 GB',
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
      environment: {
        S3_STORAGE_EXPORTS_BUCKET: exportsBucket.name,
        S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: snapshotImportsBucket.name,
        S3_STORAGE_MODULES_BUCKET: modulesBucket.name,
        S3_STORAGE_FILES_BUCKET: filesBucket.name,
        S3_STORAGE_SEARCH_BUCKET: searchBucket.name,
        MYSQL_URL: $interpolate`mysql://${database.username}:${database.password}@host.docker.internal:${database.port}`,
        CONVEX_CLOUD_ORIGIN: 'http://127.0.0.1:3210',
        CONVEX_SITE_ORIGIN: 'http://127.0.0.1:3211',
        REDACT_LOGS_TO_CLIENT: 'true',
        DO_NOT_REQUIRE_SSL: 'true',
        DISABLE_BEACON: 'true',
      },
      dev: {
        url: 'http://127.0.0.1:3210',
        command: 'bun run scripts/docker-backend.ts',
      },
    })

    const dashboard = new sst.aws.Service('Dashboard', {
      cluster,
      image: 'ghcr.io/get-convex/convex-dashboard:5143fec81f146ca67495c12c6b7a15c5802c37e2',
      environment: {
        NEXT_PUBLIC_DEPLOYMENT_URL: 'http://127.0.0.1:3210',
      },
      link: [convex],
      dev: {
        url: 'http://127.0.0.1:6791',
        command: 'bun run scripts/docker-dashboard.ts',
      },
      cpu: '0.25 vCPU',
      memory: '0.5 GB',
    })

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
      environment: {
        VITE_CONVEX_CLOUD_ORIGIN: 'http://127.0.0.1:3210',
        VITE_CONVEX_SITE_ORIGIN: 'http://127.0.0.1:3211',
        VITE_CONVEX_URL: 'http://127.0.0.1:3210',
      },
    })
  },
})
