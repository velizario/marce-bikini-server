// export type Colors = "Red" | "Green" | "Blue" | "Black";
// export type Sizes = "XS" | "S" | "M" | "L" | "XL";
// export type Categories = "Category1" | "Category2" | "Category3" | "Category4";
// there is big issue here - this is product selections and not variations!!!!!
// export type ProductVariations = Record<
//   "size" | "color" | "quantity" | "discountPrice" | "price",
//   string
// >;

import { StrapiProduct, StrapiProductAttributes } from "./strapiProductModel";

export interface ProductModel extends StrapiProduct {}

export class Product implements StrapiProduct {
  constructor(public id: string, public attributes: StrapiProductAttributes) {}
}
