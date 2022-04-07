import { StrapiRootObject } from "../model/strapiProductModel";
import { Product } from "../model/productModel";
import fetch from "node-fetch";
import { Types } from "mongoose";

export class ProductRepository {
products: Product[] = [];
constructor() {
    this.fetchProducts()
}

// Getting all Products from Strapi. This is initiated by a POST hook from Strapi server tiggered on entity update via route /strapiapi
fetchProducts = async () => {
    const res = await fetch(`${process.env.PRODUCTS_API}?populate=*`);
    const productData = (await res.json()) as StrapiRootObject;
    this.products = productData.data;
    console.log("Product data updated")
    };

fetchProductById = (id: string, size?: string) => {
    const product = this.products.find(product => product.id.toString() === id) 
    return product
    }

fetchPriceBySize = (id: string, size: string) => {
    const price = this.products.find(product => product.id.toString() === id)?.attributes.variations.find(variation => variation.size === size)?.discountPrice
    return price
    }


}

export const productHandler = new ProductRepository();