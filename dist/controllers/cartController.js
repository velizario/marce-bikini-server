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
exports.deleteCart = exports.updateCart = exports.getAllCarts = exports.createCart = exports.getCart = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const CartRepository_1 = require("../dao/CartRepository");
exports.getCart = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield CartRepository_1.cartDBHandler.findById(req.params.id);
    res.status(201).json({
        status: "success",
        data: {
            cart,
        },
    });
}));
exports.createCart = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = yield CartRepository_1.cartDBHandler.add(req.body);
    res.status(201).json({
        status: "success",
        data: {
            cart: newCart,
        },
    });
}));
exports.getAllCarts = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield CartRepository_1.cartDBHandler.findAll(req.query);
    res.status(201).json({
        status: "success",
        data: {
            carts,
        },
    });
}));
exports.updateCart = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCart = yield CartRepository_1.cartDBHandler.edit(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        data: {
            cart: updatedCart,
        },
    });
}));
exports.deleteCart = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield CartRepository_1.cartDBHandler.deleteById(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
