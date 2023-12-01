import Art from "../../../../db/models/art";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return response.status(404).json({ status: "Not Found" });
  }
  if (req.method === "GET") {
    try {
      /* const artItem = await Art.query("id").eq(id).exec(); */
      const artItem = await Art.get(id);
      return res.status(200).json(artItem);
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
