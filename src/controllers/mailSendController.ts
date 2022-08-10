import nodemailer from "nodemailer"
import catchAsync from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

export const mailSend = catchAsync (async (req: Request, res: Response, next: NextFunction) => {

    // Get data from 
    const data = {
        from: '"Velizar Stoyanov👻" <velizar4o@gmail.com>', // sender address
        to: "velizar4o@gmail.com", // list of receivers
        subject: "MarceBikini - new Contact us email", // Subject line
        text: "Hello world?", // plain text body
        html: `
               <b>From:</b> ${req.body.name}
               <br/>
               <b>Email:</b> ${req.body.email}
               <br/>
               <b>Message:</b> 
               <br/>
               ${req.body.message}
               
        `, // html body
    }

      // send mail with defined transport object
    let info = await transporter.sendMail(data);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).json({
    status: "success",
    data: "fill in"
  });

})