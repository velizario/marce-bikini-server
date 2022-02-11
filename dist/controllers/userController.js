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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.createUser = exports.getUser = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const UserRepository_1 = require("../dao/UserRepository");
exports.getUser = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.userDBHandler.findById(req.params.id);
    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
}));
exports.createUser = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield UserRepository_1.userDBHandler.add(req.body);
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
}));
exports.getAllUsers = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserRepository_1.userDBHandler.findAll(req.query);
    res.status(201).json({
        status: "success",
        data: {
            users,
        },
    });
}));
exports.updateUser = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield UserRepository_1.userDBHandler.edit(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
}));
exports.deleteUser = (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserRepository_1.userDBHandler.deleteById(req.params.id);
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
