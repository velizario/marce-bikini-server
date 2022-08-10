import * as express from "express";
import { mailSend } from "../controllers/mailSendController";


// Payment Router
const router = express.Router();

router.route("/").post(mailSend)


export default router;
