import { v4 as randomId } from "uuid";
import kitsuneArt from "../../../../db/models/art";

export default async function handler(req, res) {
  const artId = randomId();
  if (req.method === "GET") {
    try {
      const data = await kitsuneArt.scan().exec();
      res.status(200).json(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === "POST") {
    const body = req.body;
    body.id = artId;
    const art = new kitsuneArt(body);
    try {
      await art.save();
      res.status(200).json(body);
    } catch (error) {
      console.error(error);
    }
  }
}
