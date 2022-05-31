import mongoose, { Types } from "mongoose";
import { Product } from "./productModel";


// Create UserModel interface
// NOTE: Does it needs to extend identifiable?
// export interface IUser extends Indentifiable {

export interface CartUserModel {
  productId: number;
  size: string;
  quantity: number;
  _id: Types.ObjectId; 
}
  

export interface CartDBModel {
  _id: Types.ObjectId;
  cartItems: CartUserModel[];
}

// Create DB Schema
const cartSchema = new mongoose.Schema<CartDBModel>({
  _id: String,
  cartItems: [
    {
      productId: String,
      size: String,
      quantity: Number,
    },
  ],
});

// Create DB Model
const Cart = mongoose.model(
  "Carts", //this is the collection name. It is lowercase in MongoDB
  cartSchema
);

export default Cart;
