import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

export const ProductModel = mongoose.model("Product", ProductSchema);