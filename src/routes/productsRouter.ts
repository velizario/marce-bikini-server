import * as express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController";

// Product Router
const router = express.Router();

// Validate and return product ID
// router.param("id", checkId);

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProductById).patch(updateProduct);

export default router;
