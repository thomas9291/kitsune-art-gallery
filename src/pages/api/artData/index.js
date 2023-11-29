import { ddbClient } from "../../../../utils";
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as randomId } from "uuid";

export default async function handler(req, res) {
  const artId = randomId();
  if (req.method === "GET") {
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
    };
    try {
      const data = await ddbClient.send(new ScanCommand(params));
      const unmashalledItems = data.Items?.map((item) => unmarshall(item));
      res.status(200).json(unmashalledItems);
      return unmashalledItems;
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    const body = req.body;
    console.log("body from api: ", body);
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
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
