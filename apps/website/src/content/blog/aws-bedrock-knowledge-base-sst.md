---
title: "Creating an AWS Bedrock Knowledge Base with SST"
description: "A guide to creating an AWS Bedrock Knowledge Base with SST, Aurora Postgres as the vector storage, and S3 as the data source."
publishDate: 2025-04-28
tags: ["AWS", "SST", "Bedrock", "AI"]
---

I recently needed to setup a 'Knownledge' base for an AI agent application. I wanted the ability to vectorize and store markdown, text, and even PDFs. This knowledge base would then be used by the AI agent to answer questions from our users.

My high level requirements were:

- Vectorize and store various document types: markdown, text, PDFs, etc.
- Update, add and/or remove the documents in the knowledge base without much effort.
- Not have to use third party packages to handle the ingestion of documents into the knowledge base; as this was not the focus of the project. It was an added tool to our AI agent to give it access to targeted data.

AWS Bedrock Knowledge Bases provide exactly this functionality. It gives you the ability to setup Data Sources that will then be used by the Knowledge Base to create embeddings which are then stored in a vector database.

Therefore, I needed to find a way to setup this infrastructure as code. This is where the [SST](https://sst.dev/) comes in, which uses [Pulumi](https://www.pulumi.com/registry/packages/aws/) under the hood (in [Version 3](https://sst.dev/blog/moving-away-from-cdk)).

In this guide, we'll create a complete Retrieval-Augmented Generation (RAG) system using AWS Bedrock Knowledge Base, Aurora Postgres as the vector storage, and S3 as the document source - all orchestrated with SST.

## Why This Matters

Besides the fact that I never want to use the AWS Console to setup infrastructure, Bedrock Knowledge Bases allow your AI applications to search through your data and retrieve relevant information to answer user queries. Instead of using only what the foundation model was trained on, your AI can reference your specific documents, knowledge base, or data - yielding more accurate, relevant, and up-to-date responses.

Using SST to deploy this infrastructure gives us the benefits of Infrastructure as Code, TypeScript type safety, and simplified management of complex AWS resources.

## Prerequisites

Before we begin, make sure you have:

- An AWS account with appropriate permissions
- Node.js and some package manager installed. I'll be using [Bun](https://bun.sh/) in this example.
- AWS credentials configured locally
- [SST Tunnel](https://sst.dev/docs/reference/cli#tunnel) installed (`sudo sst install tunnel`) - we'll need this to connect to our database for setup
- Access to AWS Bedrock and the Titan Embedding Model (Titan v2). You must request access to the any model in Bedrock you want to use.

Some familiarity with AWS services (VPC, RDS, S3, IAM), Postgres, and terminal commands will be helpful.

## Overview

This example will use the following for the AWS Bedrock Knowledge Base:

- Aurora Postgres for the Vector Database [link](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html#AuroraPostgreSQL.VectorDB.PreparingKB)
- S3 bucket as the Data Source [link](https://docs.aws.amazon.com/bedrock/latest/userguide/s3-data-source-connector.html)

## Project Setup

Let's start by creating a new SST project:

```bash
mkdir aws-bedrock-knowledge-base-sst
cd aws-bedrock-knowledge-base-sst
bun init -y
bunx sst init
```

## Defining the Infrastructure

Open `sst.config.ts` and replace its contents with our infrastructure definition. We'll go through each component to understand its purpose.

### The SST Config Structure

Our infrastructure definition begins with the basic SST config structure:

```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-bedrock-knowledge-base-sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1", // You can change this to your preferred region
          profile: "your-aws-profile", // Replace with your AWS profile name
        },
      },
    };
  },
  async run() {
    // Our infrastructure components will go here
  },
});
```

This sets up our application name and our AWS provider configuration.

### Networking with VPC

First, let's create a [VPC](https://sst.dev/docs/component/aws/vpc) with a bastion host.

```typescript
const vpc = new sst.aws.Vpc("Vpc", {
  nat: "ec2",
  bastion: true, // so you can connect to RDS and setup the table
});
```

The VPC provides network isolation for our resources. We enable a bastion host (`bastion: true`) so we can connect to our RDS instance and set up the required database schema and tables.

### Vector Database with Aurora RDS

Now let's create our vector database using Aurora PostgreSQL. We will use a minimum scaling capacity of `0.5 ACU`. This will ensure we can connect to the database and the sync will not throw an error. Just be sure remove all resources after you are done with the example.

```typescript
const rds = new sst.aws.Aurora("Rds", {
  dataApi: true, // required for Bedrock KnowledgeBase to access RDS
  engine: "postgres",
  vpc: vpc,
  scaling: {
    min: "0.5 ACU",
  },
});
```

Key points about this configuration:

- We use `dataApi: true` because Bedrock Knowledge Base requires RDS Data API to interact with the database
- We need to use `postgres` [engine](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html#AuroraPostgreSQL.VectorDB.PreparingKB) since it supports the `pgvector` extension for vector storage
- We specify a minimum scaling capacity to ensure the database is available for Bedrock's sync operations

At this point, we have a VPC, a RDS instance, and a bastion host. We can now connect to the RDS instance and setup the database as a vector store.

Our `sst.config.ts` file should look like this:

```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-bedrock-knowledge-base-sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1", // You can change this to your preferred region
          profile: "your-aws-profile", // Replace with your AWS profile name
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("Vpc", {
      nat: "ec2",
      bastion: true, // so you can connect to RDS and setup the table
    });

    const rds = new sst.aws.Aurora("Rds", {
      dataApi: true, // required for Bedrock KnowledgeBase to access RDS
      engine: "postgres",
      vpc: vpc,
      scaling: {
        min: "0.5 ACU",
      },
    });

    // return the RDS credentials so we can use them in the next step
    return {
      rdsHost: rds.host,
      rdsPort: rds.port,
      rdsUsername: rds.username,
      rdsDatabase: rds.database,
    };
  },
});
```

You can now deploy the VPC and RDS. We will use the `dev` stage for this example. It will take a few minutes for the RDS instance to deploy and be ready to use.

```bash
bun sst deploy --stage dev
```

> **Note:** Make sure you've replaced `your-aws-profile` in the app configuration with your actual AWS profile name before deploying.

## The Crucial Manual Step: Setting up the RDS Database

Before the Knowledge Base can function, we need to prepare the RDS database. This is a critical step that must be done in the correct order.

### Preparing the Database as a Vector Store

First, we need to connect to our Aurora RDS instance. We will use the SST tunnel to connect to the database.

```bash
bun sst tunnel --stage dev
```

This will start a tunnel. Then in another terminal, use your credentials to connect with `psql`:

```bash
psql --host <RDS_ENDPOINT> --port 5432 --username postgres -d aws_knowledge_base_sst
```

You can find the password for the database in AWS Secrets Manager. Navigate to the AWS Console, search for "Secrets Manager", and select the secret for your database. You will see a 'Retrieve secret value' button. Click it and you will see the password for the database.

By default, the database username is `postgres`, and the database name is the name of the app, and replaces the hyphens with underscores.

Now we need to run the following SQL commands to prepare the database as a vector store.

1. Enable the `pgvector` extension for vector operations

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

2. Create a schema for our Bedrock integration

```sql
CREATE SCHEMA bedrock_integration;
```

3. Create a table for vector embeddings

For Titan v2 use `vector(1024)` or `vector(512)` or `vector(256)`
For Titan v1.2 use `vector(1536)`

`custom_metadata` is optional but highly recommended. It is used to write data from your metadata files.

```sql
CREATE TABLE bedrock_integration.bedrock_kb (id uuid PRIMARY KEY, embedding vector(1024), chunks text, metadata json, custom_metadata jsonb);
```

4. Create an index for vector similarity search

```sql
CREATE INDEX ON bedrock_integration.bedrock_kb USING hnsw (embedding vector_cosine_ops) WITH (ef_construction=256);
```

5. Create an index for Bedrock to query text data.

```sql
CREATE INDEX ON bedrock_integration.bedrock_kb USING gin (to_tsvector('simple', chunks));
```

6. If you are using the `custom_metadata` field, you need an index for it.

```sql
CREATE INDEX ON bedrock_integration.bedrock_kb USING gin (custom_metadata);
```

These commands:

1. Enable the `pgvector` extension for vector operations
2. Create a dedicated schema for Bedrock
3. Create a table with the right structure to store document chunks, embeddings, metadata and custom metadata
4. Create an index for efficient vector similarity search
5. Create an index for Bedrock to query text data
6. Add a custom metadata column and index for advanced filtering capabilities (more on this in the Document Metadata section below)

**Important:** The table name and column names must match what you specified in the `fieldMapping` section of your Knowledge Base resource. The vector dimension (1024) must match the embedding model you're using (Titan v2 uses 1024 dimensions).

Now we are ready to deploy the Knowledge Base.

### Setup the Knowledge Base Infrastructure

We will now deploy the remaining resources needed for the Knowledge Base.

```typescript
const knowledgeBaseBucket = new sst.aws.Bucket("KnowledgeBaseBucket");
```

This creates a bucket to store the source documents (PDFs, text files, etc.) that Bedrock will process and index into our vector database.

### IAM Role for Bedrock Access

- See (Knowledge Base Service Role)[https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html] for the IAM role needed for the Knowledge Base.

```typescript
const accountId = aws.getCallerIdentityOutput({}).apply((identity) => {
  return identity.accountId;
});

const knowledgeBaseRole = new aws.iam.Role("KnowledgeBaseRole", {
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "bedrock.amazonaws.com",
        },
        Action: "sts:AssumeRole",
        Condition: {
          StringEquals: {
            "aws:SourceAccount": accountId,
          },
        },
      },
    ],
  },
  inlinePolicies: [
    {
      name: "KnowledgeBasePolicy",
      policy: aws.getRegionOutput().name.apply((region) =>
        JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Sid: "ListFoundationModels",
              Effect: "Allow",
              Action: [
                "bedrock:ListFoundationModels",
                "bedrock:ListCustomModels",
              ],
              Resource: "*",
            },
            {
              Sid: "InvokeModels",
              Effect: "Allow",
              Action: ["bedrock:InvokeModel"],
              Resource: [
                `arn:aws:bedrock:${region}::foundation-model/amazon.titan-embed-text-v2:0`,
              ],
            },
          ],
        })
      ),
    },
    {
      name: "KnowledgeBaseBucketAccessPolicy",
      policy: $resolve(knowledgeBaseBucket.arn).apply((arn) =>
        JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: ["s3:GetObject", "s3:ListBucket"],
              Resource: [arn, `${arn}/*`],
            },
          ],
        })
      ),
    },
    {
      name: "KnowledgeBaseRDSAccessPolicy",
      policy: $resolve([rds.clusterArn, rds.secretArn]).apply(
        ([clusterArn, secretArn]) =>
          JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "RDSDescribe",
                Effect: "Allow",
                Action: ["rds:DescribeDBClusters"],
                Resource: [clusterArn],
              },
              {
                Sid: "RDSDataApiAccess",
                Effect: "Allow",
                Action: [
                  "rds-data:BatchExecuteStatement",
                  "rds-data:ExecuteStatement",
                ],
                Resource: [clusterArn],
              },
              {
                Sid: "SecretsManagerAccess",
                Effect: "Allow",
                Action: ["secretsmanager:GetSecretValue"],
                Resource: [secretArn],
              },
            ],
          })
      ),
    },
  ],
});
```

This role grants Bedrock the necessary permissions to:

1. Access the S3 bucket to read your documents
2. Connect to the RDS instance via the Data API
3. Access the RDS credentials stored in Secrets Manager
4. Invoke the Titan text embedding model to generate vector embeddings

### The Knowledge Base Resource and S3 Data Source

```typescript
const knowledgeBase = new aws.bedrock.AgentKnowledgeBase(
  "KnowledgeBase",
  {
    name: `${$app.name}-${$app.stage}-knowledge-base`,
    description: `Knowledge base for ${$app.name} ${$app.stage}`,
    storageConfiguration: {
      type: "RDS",
      rdsConfiguration: {
        databaseName: rds.database,
        credentialsSecretArn: rds.secretArn,
        resourceArn: rds.clusterArn,
        tableName: "bedrock_integration.bedrock_kb", // make sure this table exists in the RDS
        fieldMapping: {
          primaryKeyField: "id",
          textField: "chunks",
          vectorField: "embedding",
          metadataField: "metadata",
        },
      },
    },
    roleArn: knowledgeBaseRole.arn,
    knowledgeBaseConfiguration: {
      type: "VECTOR",
      vectorKnowledgeBaseConfiguration: {
        embeddingModelArn: aws
          .getRegionOutput()
          .name.apply(
            (region) =>
              `arn:aws:bedrock:${region}::foundation-model/amazon.titan-embed-text-v2:0`
          ),
      },
    },
  },
  {
    dependsOn: [knowledgeBaseRole],
  }
);

const s3DataSource = new aws.bedrock.AgentDataSource(
  "KnowledgeBaseS3DataSource",
  {
    knowledgeBaseId: knowledgeBase.id,
    name: `${$app.name}-${$app.stage}-knowledge-base-s3`,
    dataSourceConfiguration: {
      type: "S3",
      s3Configuration: {
        bucketArn: $resolve(knowledgeBaseBucket.arn).apply((arn) => arn),
      },
    },
  }
);
```

### Making Knowledge Base Linkable to other SST Resources

To make the Knowledge Base linkable to other SST resources, we need to wrap it in a linkable object.

We will define the properties and permissions that we will need in order for our other SST resources, like a Lambda function, to access the Knowledge Base.

```typescript
// make sure the knowledge base is linkable
sst.Linkable.wrap(aws.bedrock.AgentKnowledgeBase, (knowledgeBase) => {
  return {
    properties: {
      id: knowledgeBase.id,
      arn: knowledgeBase.arn,
      name: knowledgeBase.name,
    },
    include: [
      sst.aws.permission({
        actions: ["bedrock:RetrieveAndGenerate", "bedrock:Retrieve"],
        resources: [knowledgeBase.arn],
      }),
    ],
  };
});
```

### Final `sst.config.ts`

```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-bedrock-knowledge-base-sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1", // You can change this to your preferred region
          profile: "your-aws-profile", // Replace with your AWS profile name
        },
      },
    };
  },
  async run() {
    sst.Linkable.wrap(aws.bedrock.AgentKnowledgeBase, (knowledgeBase) => {
      return {
        properties: {
          id: knowledgeBase.id,
          arn: knowledgeBase.arn,
          name: knowledgeBase.name,
        },
        include: [
          sst.aws.permission({
            actions: ['bedrock:RetrieveAndGenerate', 'bedrock:Retrieve'],
            resources: [knowledgeBase.arn],
          }),
        ],
      }
    })

    const vpc = new sst.aws.Vpc('Vpc', {
      nat: 'ec2',
      bastion: true, // so you can connect to RDS and setup the table
    })

    const rds = new sst.aws.Aurora('Rds', {
      dataApi: true, // required for Bedrock KnowledgeBase to access RDS
      engine: 'postgres',
      vpc: vpc,
      scaling: {
        min: '0.5 ACU',
      },
    })

    const knowledgeBaseBucket = new sst.aws.Bucket('KnowledgeBaseBucket')

    const accountId = aws.getCallerIdentityOutput({}).apply((identity) => {
      return identity.accountId
    })

    // See (Knowledge Base Service Role)[https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html]
    const knowledgeBaseRole = new aws.iam.Role('KnowledgeBaseRole', {
      assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'bedrock.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
            Condition: {
              StringEquals: {
                'aws:SourceAccount': accountId,
              },
            },
          },
        ],
      },
      inlinePolicies: [
        {
          name: 'KnowledgeBasePolicy',
          policy: aws.getRegionOutput().name.apply((region) =>
            JSON.stringify({
              Version: '2012-10-17',
              Statement: [
                {
                  Sid: 'ListFoundationModels',
                  Effect: 'Allow',
                  Action: ['bedrock:ListFoundationModels', 'bedrock:ListCustomModels'],
                  Resource: '*',
                },
                {
                  Sid: 'InvokeModels',
                  Effect: 'Allow',
                  Action: ['bedrock:InvokeModel'],
                  Resource: [
                    `arn:aws:bedrock:${region}::foundation-model/amazon.titan-embed-text-v2:0`,
                  ],
                },
              ],
            }),
          ),
        },
        {
          name: 'KnowledgeBaseBucketAccessPolicy',
          policy: $resolve(knowledgeBaseBucket.arn).apply((arn) =>
            JSON.stringify({
              Version: '2012-10-17',
              Statement: [
                {
                  Effect: 'Allow',
                  Action: ['s3:GetObject', 's3:ListBucket'],
                  Resource: [arn, `${arn}/*`],
                },
              ],
            }),
          ),
        },
        {
          name: 'KnowledgeBaseRDSAccessPolicy',
          policy: $resolve([rds.clusterArn, rds.secretArn]).apply(([clusterArn, secretArn]) =>
            JSON.stringify({
              Version: '2012-10-17',
              Statement: [
                {
                  Sid: 'RDSDescribe',
                  Effect: 'Allow',
                  Action: ['rds:DescribeDBClusters'],
                  Resource: [clusterArn],
                },
                {
                  Sid: 'RDSDataApiAccess',
                  Effect: 'Allow',
                  Action: ['rds-data:BatchExecuteStatement', 'rds-data:ExecuteStatement'],
                  Resource: [clusterArn],
                },
                {
                  Sid: 'SecretsManagerAccess',
                  Effect: 'Allow',
                  Action: ['secretsmanager:GetSecretValue'],
                  Resource: [secretArn],
                },
              ],
            }),
          ),
        },
      ],
    })

    // // create the knowledge base
    const knowledgeBase = new aws.bedrock.AgentKnowledgeBase(
      'KnowledgeBase',
      {
        name: `${$app.name}-${$app.stage}-knowledge-base`,
        description: `Knowledge base for ${$app.name} ${$app.stage}`,
        storageConfiguration: {
          type: 'RDS',
          rdsConfiguration: {
            databaseName: rds.database,
            credentialsSecretArn: rds.secretArn,
            resourceArn: rds.clusterArn,
            tableName: 'bedrock_integration.bedrock_kb', // make sure this table exists in the RDS
            fieldMapping: {
              primaryKeyField: 'id',
              textField: 'chunks',
              vectorField: 'embedding',
              metadataField: 'metadata',
            },
          },
        },
        roleArn: knowledgeBaseRole.arn,
        knowledgeBaseConfiguration: {
          type: 'VECTOR',
          vectorKnowledgeBaseConfiguration: {
            embeddingModelArn: aws
              .getRegionOutput()
              .name.apply(
                (region) =>
                  `arn:aws:bedrock:${region}::foundation-model/amazon.titan-embed-text-v2:0`,
              ),
          },
        },
      },
      {
        dependsOn: [knowledgeBaseRole],
      },
    )

    // // create the s3 data source for the knowledge base
    const s3DataSource = new aws.bedrock.AgentDataSource('KnowledgeBaseS3DataSource', {
      knowledgeBaseId: knowledgeBase.id,
      name: `${$app.name}-${$app.stage}-knowledge-base-s3`,
      dataSourceConfiguration: {
        type: 'S3',
        s3Configuration: {
          bucketArn: $resolve(knowledgeBaseBucket.arn).apply((arn) => arn),
        },
      },
    })

    return {
      rdsHost: rds.host,
      rdsPort: rds.port,
      rdsUsername: rds.username,
      rdsDatabase: rds.database,
      knowledgeBaseId: knowledgeBase.id,
      s3DataSourceId: s3DataSource.id,
      bucketName: knowledgeBaseBucket.name,
    }
  },

```

## Adding Data to the Knowledge Base

Now that the Knowledge Base is deployed, let's add some data to it.

### Understanding Document Metadata

Before uploading documents, it's important to understand how Bedrock handles document metadata. For each document in your S3 bucket, you can include a companion metadata file that enriches your documents with additional context and enables advanced filtering capabilities.

For a document named `example.pdf`, you would create a metadata file named `example.pdf.metadata.json` in the same location in your S3 bucket. The metadata file follows this structure:

```json
{
  "metadataAttributes": {
    "company": {
      "value": {
        "type": "STRING",
        "stringValue": "BioPharm Innovations"
      },
      "includeForEmbedding": true
    },
    "created_date": {
      "value": {
        "type": "NUMBER",
        "numberValue": 20221205
      },
      "includeForEmbedding": true
    },
    "author": {
      "value": {
        "type": "STRING",
        "stringValue": "Lisa Thompson"
      },
      "includeForEmbedding": true
    },
    "origin": {
      "value": {
        "type": "STRING",
        "stringValue": "Overview"
      },
      "includeForEmbedding": true
    }
  }
}
```

Key points about metadata:

- The metadata file must share the same name as its document with `.metadata.json` appended
- It must be stored in the same folder as the source file
- The file must not exceed 10 KB
- When `includeForEmbedding` is set to `true`, the metadata attribute is incorporated into the embedding, potentially improving retrieval relevance
- These metadata fields will be stored in the `custom_metadata` column we created in our RDS table, allowing for filtering during retrieval

### Uploading Documents

1. Upload documents to your S3 bucket:

```bash
aws s3 cp ./sample-docs/ s3://YOUR-BUCKET-NAME/ --recursive --profile your-aws-profile
```

> You can find your bucket name in the SST deploy output or the AWS Console.

2. Initiate a sync job by going to the AWS Bedrock Console:

- Navigate to Knowledge Bases
- Select your Knowledge Base
- In the Data sources section, select your S3 data source
- Click "Sync" button

The sync process will:

1. Process all documents in your S3 bucket
2. Generate text embeddings using the Titan model
3. Store the chunks and embeddings in your RDS database

> Note: Syncing may take several minutes depending on the amount of data.

## Testing the Knowledge Base

Once the sync is complete, you can test your Knowledge Base directly in the AWS Console:

On the Knowledge Base page, click the "Test" button.

- click the 'Generate response' toggle to switch to only retrieve
- enter a query and click 'Run'

The Knowledge Base will:

1. Convert your query to an embedding using the same model
2. Perform a vector similarity search in the RDS database
3. Return the most relevant chunks of text from your documents

For programmatic access, you can use the AWS SDK to call the `RetrieveAndGenerate` API:

```typescript
import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { Resource } from "sst";

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

const response = await client.send(
  new RetrieveAndGenerateCommand({
    input: {
      text: "Your question about your documents here?",
    },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: Resource.KnowledgeBase.id,
      },
    },
  })
);

// or just a retreive command

const command = new RetrieveCommand({
  knowledgeBaseId: Resource.KnowledgeBase.id,
  retrievalQuery: { text: query },
  retrievalConfiguration: {
    vectorSearchConfiguration: {
      numberOfResults: 5,
    },
  },
});

const result = await client.send(command);
```

## Cleaning Up

When you're done experimenting, you can remove all deployed resources with:

```bash
bun sst remove --stage dev
```

## Conclusion

You've successfully built and deployed an AWS Bedrock Knowledge Base using SST, Aurora Postgres with vector storage, and S3. This powerful combination enables you to create AI applications that can leverage your organization's specific data.

Using SST for this deployment gives you the benefits of Infrastructure as Code, making your setup repeatable, maintainable, and version-controllable. The vector database in RDS provides efficient similarity search, while the S3 bucket offers flexible document storage.

Hope this helps you get started with building your own Knowledge Base!

## Resources

- [SST Docs](https://sst.dev/docs/)
- [AWS Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [AWS Bedrock Agent Runtime](https://docs.aws.amazon.com/bedrock/latest/userguide/sdk-general-information-section.html)
- [AWS Bedrock Agent Runtime SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-agent-runtime/)
- [AWS Create a service role for Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-permissions.html)
- [AWS Using Aurora PostgreSQL as a Knowledge Base for Amazon Bedrock](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html)

Full code for this example can be found [here](https://github.com/natac13/seanpaulcampbell.com/tree/main/examples/aws-knowledge-base-sst).
