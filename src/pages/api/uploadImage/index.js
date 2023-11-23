import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  const s3Client = new S3Client({
    region: "eu-central-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
  if (req.method === "POST") {
    const image = req.body;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: image.name,
      Body: image,
      ContentType: "image/jpeg",
      ACL: "public-read",
      Metadata: {
        "Content-Type": "image/jpeg",
      },
    });
    try {
      const response = await s3Client.send(command);
      console.log("success image updated!", response);
    } catch (error) {
      console.error(error);
    }
  }
}
