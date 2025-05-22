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
    const vpc = new sst.aws.Vpc('Vpc', { bastion: true })

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

    const zone = aws.route53.Zone.get('Zone', 'Z01339981XM1R0BVHZT6U')
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
          {
            Sid: 'CertbotRoute53Access',
            Effect: 'Allow',
            Action: ['route53:ListHostedZones', 'route53:GetChange'],
            Resource: ['*'],
          },
          {
            Sid: 'CertbotRoute53ChangeAccess',
            Effect: 'Allow',
            Action: ['route53:ChangeResourceRecordSets'],
            Resource: [zone.arn],
          },
        ],
      },
    })
    const convexUserAccessKey = new aws.iam.AccessKey('ConvexUserAccessKey', {
      user: convexUser.name,
    })

    const dockerCompose = new sst.x.DevCommand('DockerCompose', {
      dev: {
        command: 'docker compose up',
      },
      environment: {
        MYSQL_URL: $interpolate`mysql://root:root@mysql:3306`,
        S3_STORAGE_EXPORTS_BUCKET: exportsBucket.name,
        S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: snapshotImportsBucket.name,
        S3_STORAGE_MODULES_BUCKET: modulesBucket.name,
        S3_STORAGE_FILES_BUCKET: filesBucket.name,
        S3_STORAGE_SEARCH_BUCKET: searchBucket.name,
        S3_ENDPOINT_URL: 'https://s3.us-east-1.amazonaws.com',
        AWS_ACCESS_KEY_ID: convexUserAccessKey.id,
        AWS_SECRET_ACCESS_KEY: convexUserAccessKey.secret,
        AWS_REGION: 'us-east-1',
        CONVEX_CLOUD_ORIGIN: 'http://127.0.0.1:3210',
        CONVEX_SITE_ORIGIN: 'http://127.0.0.1:3211',
        DO_NOT_REQUIRE_SSL: 'true',
        DISABLE_BEACON: 'true',
        REDACT_LOGS_TO_CLIENT: 'true',
      },
    })

    const convexDev = new sst.x.DevCommand(
      'ConvexDevServer',
      { dev: { command: 'bun run convex dev' } },
      { dependsOn: [dockerCompose] },
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
        VITE_CONVEX_URL: $dev ? 'http://127.0.0.1:3210' : `http://api.${domain}`,
      },
    })

    if (!$dev) {
      const publicKeySecret = new sst.Secret('PublicKeySecret')

      const keyPair = new aws.ec2.KeyPair('KeyPair', {
        keyName: 'ConvexSelfHostedKeyPair',
        publicKey: publicKeySecret.value,
      })
      const securityGroup = new aws.ec2.SecurityGroup('BackendSecurityGroup', {
        vpcId: vpc.id,
        ingress: [
          // Allow HTTP traffic
          {
            protocol: 'tcp',
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ['0.0.0.0/0'],
          },
          // Allow HTTPS traffic
          {
            protocol: 'tcp',
            fromPort: 443,
            toPort: 443,
            cidrBlocks: ['0.0.0.0/0'],
          },
          // Allow SSH traffic
          {
            protocol: 'tcp',
            fromPort: 22,
            toPort: 22,
            cidrBlocks: ['0.0.0.0/0'],
          },
          {
            protocol: '-1',
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ['10.0.0.0/16'],
          },
        ],
        // Allow all outbound traffic
        egress: [
          {
            protocol: '-1',
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ['0.0.0.0/0'],
          },
        ],
      })

      const userData = $interpolate`#!/bin/bash
mkdir -p /home/ubuntu/convex-backend

curl -o /home/ubuntu/convex-backend/docker-compose.yml https://raw.githubusercontent.com/get-convex/convex-backend/main/self-hosted/docker/docker-compose.yml

touch /home/ubuntu/convex-backend/.env
cat > /home/ubuntu/convex-backend/.env << EOL
AWS_ACCESS_KEY_ID=${convexUserAccessKey.id}
AWS_SECRET_ACCESS_KEY=${convexUserAccessKey.secret}
AWS_REGION=us-east-1

S3_STORAGE_EXPORTS_BUCKET=${exportsBucket.name}
S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET=${snapshotImportsBucket.name}
S3_STORAGE_MODULES_BUCKET=${modulesBucket.name}
S3_STORAGE_FILES_BUCKET=${filesBucket.name}
S3_STORAGE_SEARCH_BUCKET=${searchBucket.name}
S3_ENDPOINT_URL=https://s3.us-east-1.amazonaws.com

MYSQL_URL=mysql://${database.username}:${database.password}@${database.host}:${database.port}

DO_NOT_REQUIRE_SSL=true
REDACT_LOGS_TO_CLIENT=true

CONVEX_CLOUD_ORIGIN=http://api.${domain}
CONVEX_SITE_ORIGIN=http://${domain}

EOL

chmod 600 /home/ubuntu/convex-backend/.env
chown -R ubuntu:ubuntu /home/ubuntu/convex-backend

# Remove old docker packages
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do apt-get remove $pkg -y; done

# Install docker
apt-get update -y
apt-get install ca-certificates curl nginx -y
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Add the current user to the docker group
usermod -aG docker ubuntu

# Start and enable Docker
systemctl start docker
systemctl enable docker


touch /etc/nginx/sites-available/convex-backend

cat > /etc/nginx/sites-available/convex-backend << EOL
server {
    listen 80;
    server_name ${domain};

    location / {
        proxy_pass http://localhost:3210;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.${domain};

    location / {
        proxy_pass http://localhost:3211;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name dashboard.${domain};

    location / {
        proxy_pass http://localhost:6791;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

ln -sf /etc/nginx/sites-available/convex-backend /etc/nginx/sites-enabled/

systemctl restart nginx
systemctl enable nginx

# Navigate to the directory with docker-compose.yml and .env
# and run docker compose up.
# The chown ensures that ubuntu user can manage files if needed later,
# but docker compose up itself will be run by root here.
cd /home/ubuntu/convex-backend
docker compose up -d

# Install certbot
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

snap set certbot trust-plugin-with-root=ok
snap install certbot-dns-route53

# setup aws credentials
mkdir -p ~/.aws
cat > ~/.aws/credentials << EOL
[default]
aws_access_key_id = ${convexUserAccessKey.id}
aws_secret_access_key = ${convexUserAccessKey.secret}
EOL
`

      // Place the EC2 instance in a public subnet of the VPC
      const ec2 = new aws.ec2.Instance('Backend', {
        instanceType: 't3.micro',
        ami: 'ami-084568db4383264d4', // ubuntu 24.04 LTS
        // userData: userData,
        // Use a public subnet to ensure internet connectivity
        subnetId: vpc.nodes.publicSubnets[0]?.id,
        vpcSecurityGroupIds: [securityGroup.id],
        // Ensure the instance gets a public IP
        associatePublicIpAddress: true,
        keyName: keyPair.keyName,
      })

      // create a route 53 record
      const baseRecord = new aws.route53.Record('BaseRecord', {
        zoneId: zone.zoneId,
        name: domain,
        type: 'A',
        ttl: 300,
        records: [ec2.publicIp],
      })
      const apiRecord = new aws.route53.Record('ApiRecord', {
        zoneId: zone.zoneId,
        name: `api.${domain}`,
        type: 'A',
        ttl: 300,
        records: [ec2.publicIp],
      })
      const dashboardRecord = new aws.route53.Record('DashboardRecord', {
        zoneId: zone.zoneId,
        name: `dashboard.${domain}`,
        type: 'A',
        ttl: 300,
        records: [ec2.publicIp],
      })

      return {
        AccessKeyId: convexUserAccessKey.id,
        SecretAccessKey: convexUserAccessKey.secret,
        PublicIp: ec2.publicIp,
        PublicDns: ec2.publicDns,
        ExportsBucket: exportsBucket.name,
        SnapshotImportsBucket: snapshotImportsBucket.name,
        ModulesBucket: modulesBucket.name,
        FilesBucket: filesBucket.name,
        SearchBucket: searchBucket.name,
        Database: database.database,
        DatabaseHost: database.host,
        DatabasePort: database.port,
        DatabaseUsername: database.username,
        DatabasePassword: database.password,
      }
    }
  },
})
