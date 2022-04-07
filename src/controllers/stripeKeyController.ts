import catchAsync from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

const stripeKeyController =  catchAsync (async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(process.env.STRIPE_PK);


    // res.status(201).json({
    //     status: "success",
    //     data: {
    //       user,
    //     },
    //   });

}
)

export default stripeKeyController;