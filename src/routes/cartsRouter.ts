import * as express from "express";
import { protect } from "../controllers/authController";

import {
  getAllCarts,
  createUpdateCart,
  getCart,
  updateCart,
  deleteFromCartAPI,
} from "../controllers/cartController";

// Cart Router
const router = express.Router();

router.route("/").get(protect, getAllCarts).patch(protect, createUpdateCart);

router.route("/:id").get(protect, getCart).patch(protect, createUpdateCart).delete(protect, deleteFromCartAPI);

export default router;
