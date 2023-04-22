import { mongooseConnect } from "@/lib/mongoose";
import Product from "../../models/products";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.status(200).json(await Product.findOne({ _id: req.query.id }));
    } else {
      // const data=await Product.find()
      res.status(200).json(await Product.find());
    }
  }
  if (method === "POST") {
    const { pname, desc, price, myFile,category } = req.body;
    // console.log(myFile)
    const data = await Product.create({ pname, desc, price, myFile,category });
    res.status(200).json(data);
  }
  if (method === "PUT") {
    const { pname, desc, price, myFile,category, _id } = req.body;
    res
      .status(200)
      .json(await Product.updateOne({ _id }, { pname, desc, price, myFile,category }));
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.status(200).json(true);
    }
  }
}
