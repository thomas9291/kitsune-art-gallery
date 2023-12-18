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
      const populateArtItem = await artItem.populate();
      return res.status(200).json(populateArtItem);
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
    const artItem = await Art.get(id);
    try {
      artItem.comments.push(newComment);
      await Promise.all([newComment.save(), artItem.save()]);
      return res.status(200).json({ status: "Input created" });
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const artItem = await Art.get(id);
      if (artItem.comments.length === 0) {
        await artItem.delete();
        return res.status(200).json("success deleted");
      } else {
        const comment = await kitsuneComment.scan({ artId: id }).exec();
        comment.map(async (item) => {
          await item.delete();
          return res.status(200).json("success deleted");
        });
        await artItem.delete();
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({ status: "success" });
  }
}
