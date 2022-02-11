import { Request, Response, NextFunction } from "express";

interface ResponseError extends Error {
  statusCode: number;
  status: string | undefined;
}

const globalErrorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
      status: err.status,
      message: err.message
  })
};

export default globalErrorHandler;
