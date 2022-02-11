import { Request, Response, NextFunction } from "express";
import AppError from "./appError";


type CallBack<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

const catchAsync = <T>(fn: CallBack<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      if (err.name === "TokenExpiredError") return next(new AppError("Token expired!", 401))
      next(err)
    });
  };
};

export default catchAsync;
