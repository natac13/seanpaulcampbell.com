#!/usr/bin/env bun

import { spawnSync } from 'bun'

const CONTAINER_NAME = 'convex-backend'

function stopContainer() {
  console.log(`Stopping container: ${CONTAINER_NAME}`)
  spawnSync(['docker', 'stop', CONTAINER_NAME], {
    stdio: ['inherit', 'inherit', 'inherit'],
    env: process.env,
  })
}

process.on('SIGTERM', () => {
  stopContainer()
  process.exit(0)
})

// Docker run command equivalent to the backend service in docker-compose.yml
const env = {
  INSTANCE_NAME: process.env.INSTANCE_NAME ?? '',
  INSTANCE_SECRET: process.env.INSTANCE_SECRET ?? '',
  CONVEX_RELEASE_VERSION_DEV: process.env.CONVEX_RELEASE_VERSION_DEV ?? '',
  ACTIONS_USER_TIMEOUT_SECS: process.env.ACTIONS_USER_TIMEOUT_SECS ?? '',
  CONVEX_CLOUD_ORIGIN:
    process.env.CONVEX_CLOUD_ORIGIN ?? `http://127.0.0.1:${process.env.PORT ?? 3210}`,
  CONVEX_SITE_ORIGIN:
    process.env.CONVEX_SITE_ORIGIN ?? `http://127.0.0.1:${process.env.SITE_PROXY_PORT ?? 3211}`,
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  DISABLE_BEACON: process.env.DISABLE_BEACON ?? '',
  REDACT_LOGS_TO_CLIENT: process.env.REDACT_LOGS_TO_CLIENT ?? '',
  DO_NOT_REQUIRE_SSL: process.env.DO_NOT_REQUIRE_SSL ?? '',
  POSTGRES_URL: process.env.POSTGRES_URL ?? '',
  MYSQL_URL: process.env.MYSQL_URL ?? '',
  RUST_LOG: process.env.RUST_LOG ?? 'info',
  RUST_BACKTRACE: process.env.RUST_BACKTRACE ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN ?? '',
  S3_STORAGE_EXPORTS_BUCKET: process.env.S3_STORAGE_EXPORTS_BUCKET ?? '',
  S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: process.env.S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET ?? '',
  S3_STORAGE_MODULES_BUCKET: process.env.S3_STORAGE_MODULES_BUCKET ?? '',
  S3_STORAGE_FILES_BUCKET: process.env.S3_STORAGE_FILES_BUCKET ?? '',
  S3_STORAGE_SEARCH_BUCKET: process.env.S3_STORAGE_SEARCH_BUCKET ?? '',
  S3_ENDPOINT_URL: process.env.S3_ENDPOINT_URL ?? '',
}

const ports = [`${process.env.PORT ?? 3210}:3210`, `${process.env.SITE_PROXY_PORT ?? 3211}:3211`]

const volumes = ['convex-data:/convex/data']

const args = [
  'run',
  '--rm',
  '-it',
  ...ports.flatMap((p) => ['-p', p]),
  ...volumes.flatMap((v) => ['-v', v]),
  ...Object.entries(env)
    .filter(([_, v]) => !!v)
    .flatMap(([k, v]) => ['-e', `${k}=${v}`]),
  '--stop-signal',
  'SIGINT',
  '--stop-timeout',
  '10',
  '--health-cmd',
  'curl -f http://localhost:3210/version',
  '--health-interval',
  '5s',
  '--health-start-period',
  '10s',
  '--name',
  CONTAINER_NAME,
  'ghcr.io/get-convex/convex-backend:5143fec81f146ca67495c12c6b7a15c5802c37e2',
]

spawnSync(['docker', ...args], {
  stdio: ['inherit', 'inherit', 'inherit'],
  env: process.env,
})
