"use strict";
// export type Colors = "Red" | "Green" | "Blue" | "Black";
// export type Sizes = "XS" | "S" | "M" | "L" | "XL";
// export type Categories = "Category1" | "Category2" | "Category3" | "Category4";
// there is big issue here - this is product selections and not variations!!!!!
// export type ProductVariations = Record<
//   "size" | "color" | "quantity" | "discountPrice" | "price",
//   string
// >;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, attributes) {
        this.id = id;
        this.attributes = attributes;
    }
}
exports.Product = Product;
