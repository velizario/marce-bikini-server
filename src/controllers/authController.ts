import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { Role, UserModel } from "../model/userModel";
import catchAsync from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { userDBHandler } from "../dao/UserRepository";
import AppError from "../utils/appError";
import { Types } from "mongoose";

export type JwtPayload = {id: Types.ObjectId}

const signToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id } as JwtPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (
  // user: Document<any, any, UserModel>,
  user: UserModel,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id);

  // send cookie
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRATION) * 24 * 60 * 60 * 1000
    ),
    // secure: true,   // Only over HTTPS
    httpOnly: true, //cannot be accessed or modified by the browser

    // domain: "localhost",
    // sameSite: "lax",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // do not allow creating admins via the API
    // const userData = { ...req.body, roles: [0] } as UserModel;
    const userData = req.body;

    // create the user
    const newUser = await userDBHandler.add(userData);

    createSendToken(newUser, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as UserModel;
    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
    // Check if the user exists and password is correct
    const user = await userDBHandler.validatePasswordByEmail(email, password);

    if (!user) return next(new AppError("Incorrect email or password", 401));

    // Send the token to the client
    createSendToken(user, 200, res);
  }
);

// Validates token and allows further routing
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get token and
    // Token is sent by the client in the header in format { Authorization : Bearer token }
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; //gets the second part of the string (after Bearer)
    }

    if (!token) {
      return next(new AppError("You are not logged in", 401));
    }
    // Asynchronously - typescript returns error
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //NOTE: synchronously - blocks the thread.
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload ;

    // 3) Check if user still exists (might have been deleted)

    const freshUser = await userDBHandler.findById(decoded.id.toString());
    if (!freshUser) {
      return next(new AppError("The user does not longer exist", 401));
    }

    // 4) check if user changed password after JWT was issued NOTE: not implemented.

    // NOTE: How to keep info on the logged in user? response might be best. Right now I'm also adding to the req.user - see if that is security breach, as client can add it too
    req.user = freshUser;
    res.user = freshUser;

    next();
  }
);

// Restricts to roles
export const restrictTo = (...roles: Role[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles.some((role) => roles.includes(role))) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  });
