import { Request, Response, NextFunction } from "express";
import { StrapiProduct, StrapiRootObject } from "../model/strapiProductModel";
import fetch from "node-fetch";

const DATA_URL = "http://localhost:1337/api/products";
let products: StrapiProduct[];

// Fetch products to be sent as response. Code is executed once.This should go into DAO
const fetchProducts = async () => {
  const res = await fetch(`${DATA_URL}?populate=*`);
  const data = (await res.json()) as StrapiRootObject;
  products = data.data;
  return products;
};
fetchProducts();

export const getAllProducts = async (req: Request, res: Response) => {
  await fetchProducts();

  res.status(200).json(products);
};

export const createProduct = (req: Request, res: Response) => {
  // code to create new product
  res.status(200).json(req.body);
};

export const getSingleProduct = (req: Request, res: Response) => {
  // No additional code needed - the product is added through Middleware checkProduct and returned in res.productFound.
  res.status(200).json(req.body.productFound);
};

export const updateProduct = (req: Request, res: Response) => {
  // code to update product
  res.status(200).json(req.body.productFound);
};
