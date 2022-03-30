import * as express from "express";
import { protect } from "../controllers/authController";

// Payment Router
const router = express.Router();

router.route("/").post(getAllCarts)


export default router;
