import * as express from "express";
import { getAllProducts } from "../controllers/productController";
import stripeKeyController from "../controllers/stripeKeyController";

const router = express.Router();


router.route("/").get(stripeKeyController)


export default router;
