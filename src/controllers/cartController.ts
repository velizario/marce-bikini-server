import { Request, Response } from "express";
import catchAsync from "../utils/errorHandler";
import { cartDBHandler } from "../dao/CartRepository";
import { CartDBModel } from "../model/cartModel";


export const getCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await cartDBHandler.findById(req.params.id);
  if (!cart) {
    res.status(404);
  } else

  {
    res.status(201).json({
    status: "success",
    data: cart.data,
  });}
});

export const createUpdateCart = catchAsync(async (req: Request, res: Response) => {
  if (!res.user) return new Error("No ID - confirm if authorized")
  const createObject: CartDBModel = {data: req.body, _id: res.user._id}
  const newCart = await cartDBHandler.upsert(res.user._id.toString(), createObject);
  res.status(201).json({
    status: "success",
    data: newCart.data
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
   data: updatedCart.data
  });
});

export const deleteFromCartAPI = catchAsync(async (req: Request, res: Response) => {
  const updatedCart = await cartDBHandler.deleteFromCart(req.params.id, req.body);
  if(!updatedCart) return new Error("Could not update");
  console.log({
    status: "success",
    data: updatedCart.data,
  })

  res.status(201).json({
    status: "success",
    data: updatedCart.data,
  });
});

// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
