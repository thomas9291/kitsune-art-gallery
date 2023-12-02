import Art from "../../../../db/models/art";
import kitsuneComment from "../../../../db/models/comments";
import { v4 as randomId } from "uuid";

export default async function handler(req, res) {
  const commentId = randomId();
  const { id } = req.query;
  if (!id) {
    return response.status(404).json({ status: "Not Found" });
  }
  if (req.method === "GET") {
    try {
      const artItem = await Art.get(id);
      return res.status(200).json(artItem);
    } catch (error) {
      console.error(error);
    }
  }
  if (req.method === "POST") {
    const { comment } = req.body;
    const newComment = new kitsuneComment();
    newComment.id = commentId;
    newComment.comment = comment;
    newComment.artId = id;
    console.log("new comment from post id api :", newComment);
    const artItem = await Art.get(id);
    try {
      artItem.comments.push(newComment);
      console.log("artItem from post api :", artItem);
      await Promise.all([newComment.save(), artItem.save()]);
      return res.status(200).json({ status: "Input created" });
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const artItem = await Art.get(id);
      await artItem.delete();
      return res.status(200).json("success deleted");
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ status: "success" });
  }
}
