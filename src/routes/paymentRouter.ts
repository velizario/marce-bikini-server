import * as express from "express";
import { protect } from "../controllers/authController";
import { makePayment } from "../controllers/paymentController";

// Payment Router
const router = express.Router();

router.route("/").get(protect, makePayment).post(protect, makePayment)


export default router;
