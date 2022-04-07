import { Request, Response, NextFunction } from "express";
import { StrapiProduct, StrapiRootObject } from "../model/strapiProductModel";

import { Product } from "../model/productModel";
import { productHandler } from "../dao/ProductRepository";

const DATA_URL = "http://localhost:1337/api/products";
let products: StrapiProduct[];


export const getProductById = (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("getProductById")
  const data =  productHandler.fetchProductById(id)
  res.status(200).json(data);
}

// Getting all Products from Strapi. This is initiated by a POST hook from Strapi server tiggered on entity update via route /strapiapi
export const getAllProducts = async (req: Request, res: Response) => {
  await productHandler.fetchProducts();
  res.status(200).json({
    status: "success",
    data: productHandler.products
});

};

export const createProduct = (req: Request, res: Response) => {
  // code to create new product
  res.status(200).json(req.body);
};


export const updateProduct = (req: Request, res: Response) => {
  // code to update product
  res.status(200).json(req.body.productFound);
};
