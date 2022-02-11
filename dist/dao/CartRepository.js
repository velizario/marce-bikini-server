"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDBHandler = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const MongoRepository_1 = require("./MongoRepository");
class CartRepository extends MongoRepository_1.MongoRepository {
    constructor(model) {
        super(model);
    }
}
exports.cartDBHandler = new CartRepository(cartModel_1.default);
