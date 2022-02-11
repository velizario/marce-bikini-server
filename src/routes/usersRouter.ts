import * as express from "express";
import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authController";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { Role } from "../model/userModel";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.post("/signup", signup, (req, res, next) => {
  res.send("test");
});

// login route
router.post("/login", login);

router.route("/").get(protect, getAllUsers);
router.get("/validate", protect, (req, res, next) => {
  res.send(req.user);
});
router
  .route("/:id")
  .get(protect, getUser)
  .patch(updateUser)
  .delete(protect, restrictTo(Role.ADMIN), deleteUser);
export default router;
