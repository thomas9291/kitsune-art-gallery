import React from "react";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../../utils";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "id is required" });
    return;
  }
  if (req.method === "PUT") {
    const { comment } = req.body;
    const commentParams = {
      TableName: "KitsuneComment",
      Key: {
        id: { S: id },
      },
      UpdateExpression: "SET comments = list_append(comments, :newComment)",
      ExpressionAttributeValues: {
        ":newComment": { S: comment },
      },
      ReturnValues: "UPDATED_NEW",
    };

    try {
      const data = await ddbClient.send(new UpdateItemCommand(commentParams));
      console.log("data comment from api: ", data);
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  /*  if (req.method === "POST") {
    const { comment } = req.body;
    const params = {
      TableName: "KitsuneComment",
      Item: {
        id: { S: id },
        comments: { L: [...comments, { S: comment }] },
      },
    };
    const command = new UpdateItemCommand(params);
    const response = await ddbClient.send(command);
    res.status(200).json(response);
  } */
}
