"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const userModel_1 = require("../model/userModel");
// User Router
const router = express.Router();
// router.route("/featured").get(featured, getAllUsers);
// Signup route
router.post("/signup", authController_1.signup, (req, res, next) => {
    res.send("test");
});
// login route
router.post("/login", authController_1.login);
router.route("/").get(authController_1.protect, userController_1.getAllUsers);
router.get("/validate", authController_1.protect, (req, res, next) => {
    res.send(req.user);
});
router
    .route("/:id")
    .get(authController_1.protect, userController_1.getUser)
    .patch(userController_1.updateUser)
    .delete(authController_1.protect, (0, authController_1.restrictTo)(userModel_1.Role.ADMIN), userController_1.deleteUser);
exports.default = router;
