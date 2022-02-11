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
exports.userDBHandler = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const MongoRepository_1 = require("./MongoRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository extends MongoRepository_1.MongoRepository {
    constructor(model) {
        super(model);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email: email });
            return user;
        });
    }
    validatePasswordByEmail(email, candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email: email }).select("+password");
            if (user && (yield bcryptjs_1.default.compare(candidatePassword, user.password)))
                return user;
            return false;
        });
    }
}
exports.userDBHandler = new UserRepository(userModel_1.default);
