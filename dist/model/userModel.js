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
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../utils/appError"));
const UserRepository_1 = require("../dao/UserRepository");
var Role;
(function (Role) {
    Role[Role["USER"] = 0] = "USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
// Create DB Schema
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Missing Document entry"],
        trim: true,
        maxlength: [40, "A name must have less or equal to 40 characters"],
        minlength: [2, "A name must have more or equal to 2 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Missing Document entry"],
        trim: true,
        maxlength: [40, "A lastName must have less or equal to 40 characters"],
        minlength: [2, "A lastname must have more or equal to 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Missing Document entry"],
        trim: true,
        unique: true,
        validate: [validator_1.default.isEmail, "Email is not valid"],
        // validate: {
        //   validator: function (val: string) {
        //     return val.match(/^\S+@\S+\.\S+$/);
        //   },
        //   message: "email is not valid",
        // },
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [8, "Password length should be at least 8 characters"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Missing password"],
        // minlength: [8, "Password length should be at least 8 characters"],
        validate: {
            // This only works on 'create' and 'save'!! It will not work on update!
            validator: function (el) {
                return el === this.password;
            },
            message: "password are not the same!",
        },
        select: false,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    roles: {
        type: [Number],
        enum: {
            values: [0, 1],
            message: "Not a valid role name",
        },
    },
});
// encode password before saving to database
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userFoundInDb = yield UserRepository_1.userDBHandler.findByEmail(this.email);
        if (userFoundInDb) {
            return next(new appError_1.default("User with such email already exists", 401));
        }
        //Only run this funtion if password was modified
        if (!this.isModified("password"))
            return next();
        // Hash the password with cost of 12
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        // Delete the password confirm field
        this.passwordConfirm = undefined;
        next();
    });
});
// Create DB Model
const User = mongoose_1.default.model("Users", //this is the collection name. It is lowercase in MongoDB
userSchema);
exports.default = User;
// Create User class
// export class User implements UserModel {
//   // static typeId = "User";
//   constructor(
//     public firstName: string,
//     public lastName: string,
//     public email: string,
//     public password: string,
//     public imageUrl: string,
//     public roles: Role = Role.USER,
//     public id?: string
//   ) {}
// }
// // create test user via the class instantiation
// const testUser = new User(
//   "Velizar",
//   "Stoyanov",
//   "velliboy@yahoo.com",
//   "pass123",
//   "avatar_photo"
// );
// // create new DB user directily via custom object
// const testUser = new UserDBModel({
//   firstName: "Velizar",
//   lastName: "Stoyanov",
//   email: "velliboy@yahoo.com",
//   password: "pass123",
//   imageUrl: "avatar_photo",
// });
// // create new DB user via the instantiated test user
// const newUser = new UserDBModel(testUser);
// // save the new user in DB
// newUser
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(`Error!: ${err}`));
