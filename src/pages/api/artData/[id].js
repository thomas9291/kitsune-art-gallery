import React from "react";
import { GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../../utils";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const params = {
    TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
    Key: {
      id: { S: id },
    },
  };

  if (!id) {
    return response.status(404).json({ status: "Not Found" });
  }
  if (req.method === "GET") {
    try {
      const data = await ddbClient.send(new GetItemCommand(params));
      const unmashalledItems = unmarshall(data.Item);
      return res.status(200).json(unmashalledItems);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "DELETE") {
    try {
      await ddbClient.send(new DeleteItemCommand(params));
      return res.status(200).json("success deleted");
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ status: "success" });
  }
}
