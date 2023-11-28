import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;

const s3Client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export { s3Client };

const ddbClient = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export { ddbClient };
