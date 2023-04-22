import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/category";

export default async function handle(req, res) {
  const method = req.method;
  await mongooseConnect();

  if (method === "GET") {
    const data = await Category.find().populate("parent");
    res.status(200).json(data);
  }
  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const data = await Category.create({
      name,
      parent: parentCategory,
      properties,
    });
    res.status(200).json(data);
  }
  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    const data = await Category.updateOne(
      { _id },
      { name, parent: parentCategory, properties }
    );
    res.status(200).json(data);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    // console.log("category backen", id);
    // const data = await Category.findByIdAndDelete(id);
    await Category.deleteOne({ _id });
    res.status(200).json("true");
  }
}
