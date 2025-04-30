## The Crucial Manual Step: Setting up the RDS Database

Before the Knowledge Base can function, we need to prepare the RDS database. This is a critical step that must be done in the correct order.

### Initial Deployment

First, comment out the `knowledgeBase` and `s3DataSource` resources in your `sst.config.ts` file. We need to deploy just the VPC and RDS first:

```bash
sst deploy --stage dev
```

This will deploy the VPC, RDS, bucket, and IAM role, but not yet the Knowledge Base itself.

### Connect to the Database

Start the SST tunnel to access your database:

```bash
sst tunnel --stage dev
```

This will start a tunnel and provide connection details for your RDS instance. Use these credentials to connect with your preferred Postgres client or `psql`:

```bash
psql -h <RDS_ENDPOINT> -U postgres -d postgres
```

### Set Up the Database

Once connected, run the following SQL commands to prepare the database for Bedrock:

```sql
-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a schema for our Bedrock integration
CREATE SCHEMA bedrock_integration;

-- Create the table for vector embeddings
-- For Titan v2, use vector(1024)
-- For Titan v1, use vector(1536)
CREATE TABLE bedrock_integration.bedrock_kb (
    id uuid PRIMARY KEY,
    chunks text,
    embedding vector(1024),
    metadata json
);

-- Create an index for vector similarity search
CREATE INDEX ON bedrock_integration.bedrock_kb USING hnsw (embedding vector_cosine_ops) WITH (ef_construction=256);
```

These commands:

1. Enable the `pgvector` extension for vector operations
2. Create a dedicated schema for Bedrock
3. Create a table with the right structure to store document chunks, embeddings, and metadata
4. Create an index for efficient vector similarity search

> **Important:** The table name and column names must match what you specified in the `fieldMapping` section of your Knowledge Base resource. The vector dimension (1024) must match the embedding model you're using (Titan v2 uses 1024 dimensions).

## Deploying the Knowledge Base

Now that the database is prepared, uncomment the `knowledgeBase` and `s3DataSource` resources in your `sst.config.ts` file and deploy again:

```bash
sst deploy --stage dev
```

This will create the Bedrock Knowledge Base and connect it to your RDS database and S3 bucket.

## Adding Data and Syncing

Now that the Knowledge Base is deployed, let's add some data and sync it:

1. Upload documents to your S3 bucket:

   ```bash
   aws s3 cp ./sample-docs/ s3://YOUR-BUCKET-NAME/ --recursive
   ```

   > You can find your bucket name in the SST deploy output or the AWS Console.

2. Initiate a sync job by going to the AWS Bedrock Console:
   - Navigate to Knowledge Bases
   - Select your Knowledge Base
   - Go to the Data sources tab
   - Select your S3 data source
   - Click "Sync data source"

The sync process will:

1. Process all documents in your S3 bucket
2. Generate text embeddings using the Titan model
3. Store the chunks and embeddings in your RDS database

> Note: Syncing may take several minutes depending on the amount of data.

## Testing the Knowledge Base

Once the sync is complete, you can test your Knowledge Base directly in the AWS Console:

1. Go to the AWS Bedrock Console
2. Navigate to Knowledge Bases
3. Select your Knowledge Base
4. Click "Test knowledge base"
5. Enter a query related to your documents

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

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

const response = await client.send(
  new RetrieveAndGenerateCommand({
    input: {
      text: "Your question about your documents here?",
    },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: "your-knowledge-base-id",
        modelArn:
          "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
      },
    },
  })
);

console.log(response.output.text);
```

## Cleaning Up

When you're done experimenting, you can remove all deployed resources with:

```bash
sst remove --stage dev
```

> Note: If you've uploaded valuable data to the S3 bucket, make sure to back it up before removing the stack.

## Conclusion

You've successfully built and deployed an AWS Bedrock Knowledge Base using SST, RDS Postgres with vector storage, and S3. This powerful combination enables you to create AI applications that can leverage your organization's specific data.

Using SST for this deployment gives you the benefits of Infrastructure as Code, making your setup repeatable, maintainable, and version-controllable. The vector database in RDS provides efficient similarity search, while the S3 bucket offers flexible document storage.

## Next Steps

To take this further, you might:

- Integrate your Knowledge Base with a chatbot frontend
- Experiment with different embedding models or chunking strategies
- Add preprocessing for different document types
- Implement a monitoring solution for Knowledge Base usage

## References

- [AWS Bedrock Knowledge Bases Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [AWS RDS Vector Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html)
- [SST Documentation](https://docs.sst.dev/)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [AWS Bedrock Models](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
