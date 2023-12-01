import dynamoose from "dynamoose";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
});

dynamoose.aws.ddb.set(ddb);

const kitsuneArtSchema = new dynamoose.Schema({
  id: {
    type: String,
  },
  name: { type: String },
  url: { type: String },
});

const kitsuneArt = dynamoose.model("kitsuneArt", kitsuneArtSchema);
export default kitsuneArt;
