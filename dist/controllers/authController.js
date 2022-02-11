"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = exports.login = exports.signup = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../dao/UserRepository");
const appError_1 = __importDefault(require("../utils/appError"));
const signToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
const createSendToken = (
// user: Document<any, any, UserModel>,
user, statusCode, res) => {
    const token = signToken(user.id);
    // send cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRATION) * 24 * 60 * 60 * 1000),
        // secure: true,   // Only over HTTPS
        httpOnly: true, //cannot be accessed or modified by the browser
        // domain: "localhost",
        // sameSite: "lax",
    });
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.signup = (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // do not allow creating admins via the API
    // const userData = { ...req.body, roles: [0] } as UserModel;
    const userData = req.body;
    // create the user
    const newUser = yield UserRepository_1.userDBHandler.add(userData);
    createSendToken(newUser, 201, res);
}));
exports.login = (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default("Please provide email and password!", 400));
    }
    // Check if the user exists and password is correct
    const user = yield UserRepository_1.userDBHandler.validatePasswordByEmail(email, password);
    if (!user)
        return next(new appError_1.default("Incorrect email or password", 401));
    // Send the token to the client
    createSendToken(user, 200, res);
}));
// Validates token and allows further routing
exports.protect = (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Get token and
    // Token is sent by the client in the header in format { Authorization : Bearer token }
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; //gets the second part of the string (after Bearer)
    }
    //  console.log(req.headers.cookie)
    if (!token) {
        return next(new appError_1.default("You are not logged in", 401));
    }
    // Asynchronously - typescript returns error
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //NOTE: synchronously - blocks the thread.
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists (might have been deleted)
    const freshUser = yield UserRepository_1.userDBHandler.findById(decoded.id);
    if (!freshUser) {
        return next(new appError_1.default("The user does not longer exist", 401));
    }
    // 4) check if user changed password after JWT was issued NOTE: not implemented.
    req.user = freshUser;
    console.log(freshUser);
    next();
}));
// Restricts to roles
const restrictTo = (...roles) => (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.roles.some((role) => roles.includes(role))) {
        return next(new appError_1.default("You do not have permission to perform this action", 403));
    }
    next();
}));
exports.restrictTo = restrictTo;
