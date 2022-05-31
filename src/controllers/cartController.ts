import { Request, Response } from "express";
import catchAsync from "../utils/errorHandler";
import { cartDBHandler } from "../dao/CartRepository";
import { CartDBModel, CartUserModel } from "../model/cartModel";
import { Types } from "mongoose";


export const getCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await cartDBHandler.findById(req.params.id);
  if (!cart  ) {
    res.status(404);
  } 
  
  // Request for the cart is different from the logged in user
  else if (!res || !res.user || res.user._id.toString() !== cart._id.toString()) {
    res.status(401)
  }
    else
  {
    res.status(201).json({
    status: "success",
    data: cart.cartItems,
  });}
});

export const createUpdateCart = catchAsync(async (req: Request, res: Response) => {
  console.log("Start: createUpdateCart");
  if (!res.user) return new Error("No ID - confirm if authorized")
  const createObject: CartUserModel[] = req.body
  const newCart = await cartDBHandler.upsert(res.user._id.toString(), createObject);
  res.status(201).json({
    status: "success",
    data: newCart.cartItems
  });
});

export const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const carts = await cartDBHandler.findAll(req.query);
  res.status(201).json({
    status: "success",
    data: carts,
  });
});

export const updateCart = catchAsync(async (req: Request, res: Response) => {

  const updatedCart = await cartDBHandler.edit(req.params.id , req.body);
  if(!updatedCart) return new Error("could not update");

  res.status(201).json({
  status: "success",
   data: updatedCart.cartItems
  });
});

export const deleteFromCart = catchAsync(async (req: Request, res: Response) => {
  const updatedCart = await cartDBHandler.deleteFromCart(req.params.id, req.body);
  if(!updatedCart) return new Error("Could not update");


  res.status(201).json({
    status: "success",
    data: updatedCart.cartItems,
  });
});

// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
