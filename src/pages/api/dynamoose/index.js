import React from "react";
import Art from "../../../../db/models/art";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("data from api dynamoose: ", data);
    const art = new Art(data);
    await art.save();
    res.status(200).json(art);
  }
}
