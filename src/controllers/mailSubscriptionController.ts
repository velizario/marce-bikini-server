import fetch from "node-fetch";
import catchAsync from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";


export const mailSubscription = catchAsync (async (req: Request, res: Response, next: NextFunction) => {
    const data = {
        "email": req.body.email,
    }

    const query = await fetch(
        `https://api.mailerlite.com/api/v2/subscribers/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-MailerLite-ApiKey": `${process.env.MAILERLITE_TOKEN}`,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(await query.json());
})