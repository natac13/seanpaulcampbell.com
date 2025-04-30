/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'aws-knowledge-base-sst',
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
})
