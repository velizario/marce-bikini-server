import { Request, Response } from "express";
import catchAsync from "../utils/errorHandler";
import { userDBHandler } from "../dao/UserRepository";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userDBHandler.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userDBHandler.add(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userDBHandler.findAll(req.query);
  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userDBHandler.edit(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userDBHandler.deleteById(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
