import { ddbClient } from "../../../../utils";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as randomId } from "uuid";

export default async function handler(req, res) {
  const artId = randomId();
  if (req.method === "POST") {
    const body = req.body;
    console.log("body from api: ", body);
    const params = {
      TableName: "kitsune8731",
      Item: {
        id: { S: artId },
        name: { S: body.name },
        url: { S: body.url },
      },
    };
    try {
      const data = await ddbClient.send(new PutItemCommand(params));
      console.log("data from api: ", data);
      res.status(200).json(data);
      console.log("success data fetched!");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
