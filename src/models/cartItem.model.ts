import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  productId: { type: String, },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
  
});

export const CartItemModel = model("CartItem", cartItemSchema);