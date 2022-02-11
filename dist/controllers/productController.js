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
exports.updateProduct = exports.getSingleProduct = exports.createProduct = exports.getAllProducts = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const DATA_URL = "http://localhost:1337/api/products";
let products;
// Fetch products to be sent as response. Code is executed once.This should go into DAO
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, node_fetch_1.default)(`${DATA_URL}?populate=*`);
    const data = (yield res.json());
    products = data.data;
    return products;
});
fetchProducts();
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("fetching...");
    yield fetchProducts();
    res.status(200).json(products);
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => {
    // code to create new product
    res.status(200).json(req.body);
};
exports.createProduct = createProduct;
const getSingleProduct = (req, res) => {
    // No additional code needed - the product is added through Middleware checkProduct and returned in res.productFound.
    res.status(200).json(req.body.productFound);
};
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => {
    // code to update product
    res.status(200).json(req.body.productFound);
};
exports.updateProduct = updateProduct;
// // check if product has the declared id in the path
// export const checkId = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   val: string
// ) => {
//   // check if product with requested id exists
//   const data = products.find((item) => item.id === Number(val));
//   if (!data) {
//     return res
//       .status(404)
//       .send(`Could not find a product with id ${req.params.id}`);
//   } else {
//     req.body.productFound = data;
//     next();
//   }
// };
// Check if product contains necessary fields
// export const validateProduct = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(req.body);
//   if (req.body.name && req.body.time) {
//     console.log("all good");
//     next();
//   } else {
//     res.status(400).json({
//       status: fail,
//       message: "Missing name or time",
//     });
//   }
//   next();
// };
