import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  pname: {
    type: String,
    required:true
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required:true
  },
  myFile: [{ type: String }],
  category:{type:mongoose.Types.ObjectId,ref:'Category'}
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
