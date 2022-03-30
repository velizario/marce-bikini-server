import * as express from "express";
import { mailSubscription } from "../controllers/mailSubscriptionController";

// Product Router
const router = express.Router();

// Validate and return product ID
// router.param("id", checkId);

router.route("/").post(mailSubscription);

export default router;
