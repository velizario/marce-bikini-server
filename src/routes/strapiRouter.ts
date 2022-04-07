import * as express from "express";
import { getAllProducts } from "../controllers/productController";

// Strapi API Hooks Router
const router = express.Router();


router.route("/").post(getAllProducts)


export default router;
