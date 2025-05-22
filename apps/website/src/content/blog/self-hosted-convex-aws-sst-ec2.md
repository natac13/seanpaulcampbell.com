---
title: "Self-Hosted Convex on AWS with SST using EC2"
description: "My round 2 guide to self-hosting Convex on AWS with SST. This time using EC2."
publishDate: 2025-05-22 12:00:00
tags: ["Convex", "AWS", "SST", "EC2"]
---

The last post I did was using SST to deploy and run locally, Convex on AWS. After finishing the post and going on my run, I realized I should likely have used EC2 instead. This post is my "Round 2"attempt to self-host Convex on AWS using EC2. Hopefully this will be more helpful and easier to follow.

## Prerequisites

- Node.js and npm/pnpm/bun installed
- Basic familiarity with SST and Convex
- An AWS account

## Project Setup

Let's dive into Round 2 with a fresh project setup.

```bash
bun create vite@latest convex-self-hosted-ec2 --template react-ts
cd convex-self-hosted-ec2

# Setup SST
bunx sst init

# Install dependencies
bun install
bun sst install
```

**Note:** Vite's `tsconfig.node.json` needs to include the `sst.config.ts` file.

## Convex Setup

Install Convex.

```bash
bun add convex
```

## SST Setup

```typescript title="sst.config.ts"
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "convex-self-hosted",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1", // set to your desired region
          profile: "<YOUR_AWS_PROFILE>", // set to your desired AWS profile
        },
      },
    };
  },
  async run() {},
});
```

## Local Development

My thinking clarity always comes to me when I'm on my run. And after finishing the last post and thinking about it some more, I realized I could have made the local setup a bit easier. So for Round 2, we are going to start with the Convex `docker-compose.yml` file and go from there. We will add in a MySQL database and then use the SST `DevCommand` to start everything up.

**Note:** I found, unfortunately, that even though I was using `docker compose up` without the `-d` flag, it was still running in the background when I stopped the SST dev environment. Therefore, to stop the containers we will need to use the `docker compose down` command manually. However, restarting the SST dev environment will still work even though the container were previously running.

```dockerfile title="docker-compose.yml" {2-10,67} collapse={12-51,54-63}
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=convex_self_hosted
    volumes:
      - mysql-data:/var/lib/mysql
  backend:
    image: ghcr.io/get-convex/convex-backend:5143fec81f146ca67495c12c6b7a15c5802c37e2
    stop_grace_period: 10s
    stop_signal: SIGINT
    ports:
      - "${PORT:-3210}:3210"
      - "${SITE_PROXY_PORT:-3211}:3211"
    volumes:
      - data:/convex/data
    environment:
      - INSTANCE_NAME=${INSTANCE_NAME:-}
      - INSTANCE_SECRET=${INSTANCE_SECRET:-}
      - CONVEX_RELEASE_VERSION_DEV=${CONVEX_RELEASE_VERSION_DEV:-}
      - ACTIONS_USER_TIMEOUT_SECS=${ACTIONS_USER_TIMEOUT_SECS:-}
      - CONVEX_CLOUD_ORIGIN=http://127.0.0.1:${PORT:-3210}
      - CONVEX_SITE_ORIGIN=http://127.0.0.1:${SITE_PROXY_PORT:-3211}
      - DATABASE_URL=${DATABASE_URL:-}
      - DISABLE_BEACON=${DISABLE_BEACON:-}
      - REDACT_LOGS_TO_CLIENT=${REDACT_LOGS_TO_CLIENT:-}
      - DO_NOT_REQUIRE_SSL=${DO_NOT_REQUIRE_SSL:-}
      - POSTGRES_URL=${POSTGRES_URL:-}
      - MYSQL_URL=${MYSQL_URL:-}
      - RUST_LOG=${RUST_LOG:-info}
      - RUST_BACKTRACE=${RUST_BACKTRACE:-}
      - AWS_REGION=${AWS_REGION:-}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:-}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:-}
      - AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN:-}
      - S3_STORAGE_EXPORTS_BUCKET=${S3_STORAGE_EXPORTS_BUCKET:-}
      - S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET=${S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET:-}
      - S3_STORAGE_MODULES_BUCKET=${S3_STORAGE_MODULES_BUCKET:-}
      - S3_STORAGE_FILES_BUCKET=${S3_STORAGE_FILES_BUCKET:-}
      - S3_STORAGE_SEARCH_BUCKET=${S3_STORAGE_SEARCH_BUCKET:-}
      - S3_ENDPOINT_URL=${S3_ENDPOINT_URL:-}
    depends_on:
      mysql:
        condition: service_started
    healthcheck:
      test: curl -f http://localhost:3210/version
      interval: 5s
      start_period: 10s

  dashboard:
    image: ghcr.io/get-convex/convex-dashboard:5143fec81f146ca67495c12c6b7a15c5802c37e2
    stop_grace_period: 10s
    stop_signal: SIGINT
    ports:
      - "${DASHBOARD_PORT:-6791}:6791"
    environment:
      - NEXT_PUBLIC_DEPLOYMENT_URL=http://127.0.0.1:${PORT:-3210}
    depends_on:
      backend:
        condition: service_healthy

volumes:
  data:
  mysql-data:

```

I could use the script trick from the last post to start and stop the docker containers, but I think it is ok to manually stop them. Plus, restarting won't be an issue. This way when we start the SST dev environment, the containers will start up.

### Initial Setup

```typescript title="sst.config.ts"
// in the async run function
const exportsBucket = new sst.aws.Bucket("ExportsBucket", {});
const snapshotImportsBucket = new sst.aws.Bucket("SnapshotImportsBucket", {});
const modulesBucket = new sst.aws.Bucket("ModulesBucket", {});
const filesBucket = new sst.aws.Bucket("FilesBucket", {});
const searchBucket = new sst.aws.Bucket("SearchBucket", {});

const convexUser = new aws.iam.User("ConvexUser");
const convexUserPolicy = new aws.iam.UserPolicy("ConvexUserPolicy", {
  user: convexUser.name,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "ExportsBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [exportsBucket.arn, $interpolate`${exportsBucket.arn}/*`],
      },
      {
        Sid: "SnapshotImportsBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [
          snapshotImportsBucket.arn,
          $interpolate`${snapshotImportsBucket.arn}/*`,
        ],
      },
      {
        Sid: "ModulesBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [modulesBucket.arn, $interpolate`${modulesBucket.arn}/*`],
      },
      {
        Sid: "FilesBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [filesBucket.arn, $interpolate`${filesBucket.arn}/*`],
      },
      {
        Sid: "SearchBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [searchBucket.arn, $interpolate`${searchBucket.arn}/*`],
      },
    ],
  },
});
const convexUserAccessKey = new aws.iam.AccessKey("ConvexUserAccessKey", {
  user: convexUser.name,
});

const dockerCompose = new sst.x.DevCommand("DockerCompose", {
  dev: {
    command: "docker compose up",
  },
  environment: {
    MYSQL_URL: $interpolate`mysql://root:root@mysql:3306`,
    S3_STORAGE_EXPORTS_BUCKET: exportsBucket.name,
    S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: snapshotImportsBucket.name,
    S3_STORAGE_MODULES_BUCKET: modulesBucket.name,
    S3_STORAGE_FILES_BUCKET: filesBucket.name,
    S3_STORAGE_SEARCH_BUCKET: searchBucket.name,
    S3_ENDPOINT_URL: "https://s3.us-east-1.amazonaws.com",
    AWS_ACCESS_KEY_ID: convexUserAccessKey.id,
    AWS_SECRET_ACCESS_KEY: convexUserAccessKey.secret,
    AWS_REGION: "us-east-1",
    CONVEX_CLOUD_ORIGIN: "http://127.0.0.1:3210",
    CONVEX_SITE_ORIGIN: "http://127.0.0.1:3211",
    DO_NOT_REQUIRE_SSL: "true",
    DISABLE_BEACON: "true",
    REDACT_LOGS_TO_CLIENT: "true",
  },
});
```

Notice that we use `mysql://root:root@mysql:3306` for the `MYSQL_URL`. This is because we are using the database in the same docker compose file and can reference the service name as the host.

I also had to add the `S3_ENDPOINT_URL` to the environment variables because I was getting an error about the empty string. Not sure why it did not come up the last time. 🤷

And, I left off the `Vpc` and `Mysql` resources because we can actually get away locally without them for now. They will be needed shortly to deploy to AWS though.

### Adding the Convex Frontend and Tutorial Demo Code

Next we will setup Convex for the frontend using the code from their [tutorial](https://github.com/get-convex/convex-tutorial). I copied over the `src/` directory from my last post and then added the following. And copy the `convex/chat.ts` file to the new `convex/` directory.

```bash
bun add convex @faker-js/faker
```

```typescript title="convex/chat.ts" collapse={5-15,19-23}
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sendMessage = mutation({
  args: {
    user: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("messages", {
      user: args.user,
      body: args.body,
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").take(50);
    return messages.reverse();
  },
});
```

Setup the `.env.local` file with the following.

```base title=".env.local"
CONVEX_SELF_HOSTED_URL='http://127.0.0.1:3210'
CONVEX_SELF_HOSTED_ADMIN_KEY='<your admin key>'
```

### Update `sst.config.ts`

To start Convex `dev` and the demo react app we can add the following to the `sst.config.ts` file.

```typescript title='sst.config.ts'
// ... dockerCompose DevCommand above ...

const convexDev = new sst.x.DevCommand(
  "ConvexDevServer",
  { dev: { command: "bun run convex dev" } },
  { dependsOn: [dockerCompose] }
);

const site = new sst.aws.StaticSite("Site", {
  dev: {
    command: "bun run dev",
    url: "http://127.0.0.1:5173",
  },
  build: {
    command: "bun run build",
    output: "./dist",
  },
  environment: {
    VITE_CONVEX_URL: "http://127.0.0.1:3210",
  },
});
```

### SST Dev

We can now start the SST dev environment and have it start the docker containers and the Convex dev server.

```bash
bun sst dev
```

When you stop the SST dev environment, the docker containers will still be running. You can stop them with the following command.

```bash title="Stopping the docker containers"
docker compose down
```

## Deploying to AWS EC2

We will first need to create a new SSH key pair so we can connect to the EC2 instance we will be using. As simple as this is, I always go to the GitHub Docs on [generating a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for the instructions.

I like to give the key an explicit name so I can easily differentiate it from other keys.

You can then set the public key as a secret in SST. I'm using the `--fallback` flag to ensure the secret is used on any stage unless it is overridden in that stage.

```bash
ssh-keygen -C "your-email@example.com" -f ~/.ssh/convex-self-hosted-ec2-blog
# you can also use the following command to copy the public key to the clipboard
#pbcopy < ~/.ssh/convex-self-hosted-ec2-blog.pub

bun sst secret set --fallback PublicKeySecret < ~/.ssh/convex-self-hosted-ec2-blog.pub
```

### Create the EC2 Instance

We will update the `sst.config.ts` file to include the VPC, database, EC2 instance, and route 53 records. This is a lot of code, and I will highlight the important parts.

#### User Data Script

The `userData` script is a dense block of code that that will be run on the EC2 instance as the `root` user. It can be used to setup the EC2 instance, and run commands. I apologize for the size, but I wanted to try and get as much of the setup done in the `sst.config.ts` file as possible.

At a high level, we need to do the following:

- Install Docker and Docker Compose
- Setup the environment variables for the Convex backend
- Setup the basic nginx configuration
- Install Certbot and the Route53 plugin
- Set the AWS credentials for the `root` user to the IAM user we created in the `sst.config.ts` file
- Generate the SSL certificates
- Add the SSL certificates to the nginx configuration
- Restart the nginx service

I'll go through the script in more detail after the code block.

```typescript title="sst.config.ts" {15-18,65-76,123,127,182-202,233-275,286-287,296-302,308,309,311,324,331,338} collapse={4-12,20-26,32-64,80-111,114-121}
const vpc = new sst.aws.Vpc("Vpc", { bastion: true });

const database = new sst.aws.Mysql("Database", {
  vpc,
  database: "convex_self_hosted",
  dev: {
    database: "convex_self_hosted",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
  },
});

const zone = aws.route53.Zone.get("Zone", "<YOUR_ROUTE53_ZONE_ID>");
const baseDomain = "<YOUR_BASE_DOMAIN>";
// you can set the domain however you want, I just did this for this demo.
const domain = $dev ? `${$app.stage}.${baseDomain}` : baseDomain;

const exportsBucket = new sst.aws.Bucket("ExportsBucket", {});
const snapshotImportsBucket = new sst.aws.Bucket("SnapshotImportsBucket", {});
const modulesBucket = new sst.aws.Bucket("ModulesBucket", {});
const filesBucket = new sst.aws.Bucket("FilesBucket", {});
const searchBucket = new sst.aws.Bucket("SearchBucket", {});

const convexUser = new aws.iam.User("ConvexUser");
const convexUserPolicy = new aws.iam.UserPolicy("ConvexUserPolicy", {
  user: convexUser.name,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "ExportsBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [exportsBucket.arn, $interpolate`${exportsBucket.arn}/*`],
      },
      {
        Sid: "SnapshotImportsBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [
          snapshotImportsBucket.arn,
          $interpolate`${snapshotImportsBucket.arn}/*`,
        ],
      },
      {
        Sid: "ModulesBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [modulesBucket.arn, $interpolate`${modulesBucket.arn}/*`],
      },
      {
        Sid: "FilesBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [filesBucket.arn, $interpolate`${filesBucket.arn}/*`],
      },
      {
        Sid: "SearchBucketAccess",
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [searchBucket.arn, $interpolate`${searchBucket.arn}/*`],
      },
      {
        Sid: "CertbotRoute53Access",
        Effect: "Allow",
        Action: ["route53:ListHostedZones", "route53:GetChange"],
        Resource: ["*"],
      },
      {
        Sid: "CertbotRoute53ChangeAccess",
        Effect: "Allow",
        Action: ["route53:ChangeResourceRecordSets"],
        Resource: [zone.arn],
      },
    ],
  },
});
const convexUserAccessKey = new aws.iam.AccessKey("ConvexUserAccessKey", {
  user: convexUser.name,
});

const dockerCompose = new sst.x.DevCommand("DockerCompose", {
  dev: {
    command: "docker compose up",
  },
  environment: {
    MYSQL_URL: $interpolate`mysql://root:root@mysql:3306`,
    S3_STORAGE_EXPORTS_BUCKET: exportsBucket.name,
    S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET: snapshotImportsBucket.name,
    S3_STORAGE_MODULES_BUCKET: modulesBucket.name,
    S3_STORAGE_FILES_BUCKET: filesBucket.name,
    S3_STORAGE_SEARCH_BUCKET: searchBucket.name,
    S3_ENDPOINT_URL: "https://s3.us-east-1.amazonaws.com",
    AWS_ACCESS_KEY_ID: convexUserAccessKey.id,
    AWS_SECRET_ACCESS_KEY: convexUserAccessKey.secret,
    AWS_REGION: "us-east-1",
    CONVEX_CLOUD_ORIGIN: "http://127.0.0.1:3210",
    CONVEX_SITE_ORIGIN: "http://127.0.0.1:3211",
    DO_NOT_REQUIRE_SSL: "true",
    DISABLE_BEACON: "true",
    REDACT_LOGS_TO_CLIENT: "true",
  },
});

const convexDev = new sst.x.DevCommand(
  "ConvexDevServer",
  { dev: { command: "bun run convex dev" } },
  { dependsOn: [dockerCompose] }
);

const site = new sst.aws.StaticSite("Site", {
  dev: {
    command: "bun run dev",
    url: "http://127.0.0.1:5173",
  },
  build: {
    command: "bun run build",
    output: "./dist",
  },
  environment: {
    VITE_CONVEX_URL: $dev ? "http://127.0.0.1:3210" : `http://api.${domain}`,
  },
});

if (!$dev) {
  const publicKeySecret = new sst.Secret("PublicKeySecret");

  const keyPair = new aws.ec2.KeyPair("KeyPair", {
    keyName: "ConvexSelfHostedKeyPair",
    publicKey: publicKeySecret.value,
  });
  const securityGroup = new aws.ec2.SecurityGroup("BackendSecurityGroup", {
    vpcId: vpc.id,
    ingress: [
      // Allow HTTP traffic
      {
        protocol: "tcp",
        fromPort: 80,
        toPort: 80,
        cidrBlocks: ["0.0.0.0/0"],
      },
      // Allow HTTPS traffic
      {
        protocol: "tcp",
        fromPort: 443,
        toPort: 443,
        cidrBlocks: ["0.0.0.0/0"],
      },
      // Allow SSH traffic
      {
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"],
      },
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["10.0.0.0/16"],
      },
    ],
    // Allow all outbound traffic
    egress: [
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
  });

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
`;

  // Place the EC2 instance in a public subnet of the VPC
  const ec2 = new aws.ec2.Instance("Backend", {
    instanceType: "t3.micro",
    ami: "ami-084568db4383264d4", // ubuntu 24.04 LTS
    userData: userData,
    // Use a public subnet to ensure internet connectivity
    subnetId: vpc.nodes.publicSubnets[0]?.id,
    vpcSecurityGroupIds: [securityGroup.id],
    // Ensure the instance gets a public IP
    associatePublicIpAddress: true,
    keyName: keyPair.keyName,
  });

  // create a route 53 record
  const baseRecord = new aws.route53.Record("BaseRecord", {
    zoneId: zone.zoneId,
    name: domain,
    type: "A",
    ttl: 300,
    records: [ec2.publicIp],
  });
  const apiRecord = new aws.route53.Record("ApiRecord", {
    zoneId: zone.zoneId,
    name: `api.${domain}`,
    type: "A",
    ttl: 300,
    records: [ec2.publicIp],
  });
  const dashboardRecord = new aws.route53.Record("DashboardRecord", {
    zoneId: zone.zoneId,
    name: `dashboard.${domain}`,
    type: "A",
    ttl: 300,
    records: [ec2.publicIp],
  });

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
  };
}
```

From the highlighted lines, we can see that:

- We set a base domain which you can set however you want. I did this for this demo. For a better way please see how the SST handles their domains for their [Console](https://github.com/sst/console/blob/dev/infra/dns.ts).
- We add permissions to the IAM user based on what the `certbot-dns-route53` plugin needs. This is spelled out in the [Certbot DNS Route53 Plugin](https://certbot-dns-route53.readthedocs.io/en/stable/) docs.
- Adjust the `VITE_CONVEX_URL` environment variable on the `StaticSite` resource.
- Then only in `$dev` we deploy the EC2 instance.
- Create the Public Key, Key Pair, and Security Group for the EC2 instance.
- I'll go over the `userData` in more detail in the next section.
- Hardcode the AMI ID for the Ubuntu 24.04 LTS image. These are region-specific, so you will need to find the correct one for your region, and the latest version.
- We make the EC2 instance and put it into the public subnet of the VPC.
  - set the security group to the new security group we created.
  - set the key pair to the new key pair we created.
- Create the route 53 records for the base domain, api, and dashboard.
- Then return a load of information!

### Deploy with SST

Now that we have the resources defined, we can deploy them with the SST CLI. You can use any stage name you want. It is recommended though that you use a different stage than the one you are using for your local development. Without the `--stage` flag, SST will default to your personal stage.

```bash title="Deploying with SST"
bun sst deploy --stage demo
```

### User Data

Really the only _must-have_ part of the `userData` script is where we setup the environment variables for the Convex backend, and the basic nginx configuration. This is because we have access to the SST resources when defining the `userData` script. The other parts, like installing docker, adding the current user to the docker group, and enabling docker services, could be done my SSHing into the EC2 instance and running the commands.

For this reason, I have included a bash script that includes all the commands to run on the EC2 instance. I will leave off the parts that used interpolation to set the environment variables.

Also, at the end of the script, I'm going to include the rest of the commands I did not include in the `userData` script. i.e Certbot, and the final nginx configuration with SSL. The `sudo` command is needed if not run as root during the `userData` script.

```bash title="userData.sh"
#!/bin/bash

mkdir -p /home/ubuntu/convex-backend

curl -o /home/ubuntu/convex-backend/docker-compose.yml https://raw.githubusercontent.com/get-convex/convex-backend/main/self-hosted/docker/docker-compose.yml

touch /home/ubuntu/convex-backend/.env
# remove due to interpolation in the sst.config.ts file
# cat > /home/ubuntu/convex-backend/.env << EOL
# AWS_ACCESS_KEY_ID=${convexUserAccessKey.id}
# AWS_SECRET_ACCESS_KEY=${convexUserAccessKey.secret}
# AWS_REGION=us-east-1

# S3_STORAGE_EXPORTS_BUCKET=${exportsBucket.name}
# S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET=${snapshotImportsBucket.name}
# S3_STORAGE_MODULES_BUCKET=${modulesBucket.name}
# S3_STORAGE_FILES_BUCKET=${filesBucket.name}
# S3_STORAGE_SEARCH_BUCKET=${searchBucket.name}
# S3_ENDPOINT_URL=https://s3.us-east-1.amazonaws.com

# MYSQL_URL=mysql://${database.username}:${database.password}@${database.host}:${database.port}

# DO_NOT_REQUIRE_SSL=true
# REDACT_LOGS_TO_CLIENT=true

# CONVEX_CLOUD_ORIGIN=http://api.${domain}
# CONVEX_SITE_ORIGIN=http://${domain}

# EOL

# these only need to be run if the command to make the directory is not run by the `ubuntu` user
# chmod 600 /home/ubuntu/convex-backend/.env
# chown -R ubuntu:ubuntu /home/ubuntu/convex-backend

# Remove old docker packages
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg -y; done

# Install docker & nginx
sudo apt-get update -y
sudo apt-get install ca-certificates curl nginx -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Add the current user to the docker group
usermod -aG docker ubuntu
newgrp docker # this is needed to add the current user to the docker group

# Start and enable Docker
systemctl start docker
systemctl enable docker


touch /etc/nginx/sites-available/convex-backend
# remove due to interpolation in the sst.config.ts file
# cat > /etc/nginx/sites-available/convex-backend << EOL
# server {
#     listen 80;
#     server_name ${domain};

#     location / {
#         proxy_pass http://localhost:3210;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }

# server {
#     listen 80;
#     server_name api.${domain};

#     location / {
#         proxy_pass http://localhost:3211;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }

# server {
#     listen 80;
#     server_name dashboard.${domain};

#     location / {
#         proxy_pass http://localhost:6791;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }
# EOL

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

## setup aws credentials on the root user
sudo su -
mkdir -p ~/.aws
touch ~/.aws/credentials

# cat > ~/.aws/credentials << EOL
# [default]
# aws_access_key_id = <your-access-key-id>
# aws_secret_access_key = <your-secret-access-key>
# EOL

#certbot certonly --dns-route53 -d <your-domain> -d api.<your-domain> -d dashboard.<your-domain>

# check on docker
# docker ps
```

### SSL

Once Certbot has generated the SSL certificates, we need to add them to the nginx configuration. Certbot should also setup auto-renewal with a cron job. You can check their [docs](https://eff-certbot.readthedocs.io/en/stable/using.html#automated-renewals) for more information.

Please note that the `base-domain.com` is just an example domain. You can use your own domain. Just make sure to set them to their correct values.

This is a very simple nginx configuration that listens on port 80 and redirects to port 443. Then based on the domain, it will proxy the request to the correct port on the EC2 instance.

For example, if you go to `https://api.base-domain.com`, it will proxy the request to `http://localhost:3211`.

```bash title="nginx.conf" {3,9,11,12,26,28,29,43,45,46}
server {
  listen 80;
  server_name api.base-domain.com dashboard.base-domain.com base-domain.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name api.base-domain.com;

  ssl_certificate /etc/letsencrypt/live/base-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/base-domain.com/privkey.pem;

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
  listen 443 ssl;
  server_name base-domain.com;

  ssl_certificate /etc/letsencrypt/live/base-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/base-domain.com/privkey.pem;

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
  listen 443 ssl;
  server_name dashboard.base-domain.com;

  ssl_certificate /etc/letsencrypt/live/base-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/base-domain.com/privkey.pem;

  location / {
    proxy_pass http://localhost:6791;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Update All Urls to SSL

Now that we have the SSL certificates, we need to update all the urls in the environment variables.

Make sure to update the `CONVEX_CLOUD_ORIGIN` and `CONVEX_SITE_ORIGIN` environment variables to the new values, and restart docker compose.

```bash title="Restarting the Convex Backend"
cd /home/ubuntu/convex-backend
docker compose up -d --force-recreate

# check on docker
docker ps
```

## Conclusion

Well, once again we have Convex Self-Hosted on AWS! This time with an EC2 instance. Now the question is, which way is better? Well, as always, it depends.

### For EC2

The EC2 instance setup will run much cheaper than the ECS setup as we can run the Convex backend and dashboard on the same instance, instead of the 2 ECS services, plus Load Balancer, plus API Gateway. Making it a good choice for smaller projects. Plus, at this time the self-hosted Convex backend cannot horizontally scale, so the ECS elastic scaling is lost to us.

I also like that the EC2 instance version does not require me to regenerate the Convex admin key, as the container uses the same volume each time.

This blog post is shorter than the ECS one, which might be a good thing? Maybe? It is hard to show the time it takes to setup the server if the `userData` script fails. I must have deployed 20 servers before I got it to where it is now. This was a small skill issue on my part. Although, after reading the [AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), I figured it out.

### For ECS

More of the infrastructure is defined in the SST config file, and their is less manual work. This makes is easier to deploy and manage, IMHO. This holds true especially for the SSL setup. With SST I set the `domain` property on the given resource, and as long as their is a Hosted Zone in the AWS account, the DNS will all be automatically created. THANK YOU SST!

Not having to manage a server is always a nice thing. Taking a Docker image and telling ECS to run it is a lot easier than all the work that comes with managing a server.

I never like going through the manual process of setting up a server. I know it is really not that hard, and I have done it many times, but after finding SST, I have tried to avoid it as much as possible.

## Resources

You can find the ECS version of this blog post [here](./self-hosted-convex-aws-sst).

And the full code example of this EC2 version [here](https://github.com/natac13/seanpaulcampbell.com/tree/main/examples/convex-self-hosted-ec2).

- [Certbot setup](https://certbot.eff.org/instructions)
- [Certbot DNS Route53 Plugin](https://certbot-dns-route53.readthedocs.io/en/stable/)
- [GitHub SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Docker Install](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Post Install](https://docs.docker.com/engine/install/linux-postinstall/)
- [SST Pulumi EC2 Example](https://sst.dev/docs/examples/#ec2-with-pulumi)
- [Pulumi EC2](https://www.pulumi.com/registry/packages/aws/api-docs/ec2/instance/)
- [Convex Self-Hosted Guide](https://github.com/get-convex/convex-backend/blob/main/self-hosted/README.md)
