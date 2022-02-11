"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Create DB Schema
const cartSchema = new mongoose_1.default.Schema({
    _id: String,
    data: [
        {
            productId: String,
            variationId: String,
            quantity: Number,
        },
    ],
});
// Create DB Model
const Cart = mongoose_1.default.model("Carts", //this is the collection name. It is lowercase in MongoDB
cartSchema);
exports.default = Cart;
