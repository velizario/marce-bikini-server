import mongoose, { HydratedDocument, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// import { Indentifiable, IdType } from "./shared-types";
import AppError from "../utils/appError";
import { userDBHandler } from "../dao/UserRepository";

// Create UserModel interface
// NOTE: Does it needs to extend identifiable?
// export interface IUser extends Indentifiable {
export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  imageUrl: string;
  _id: Types.ObjectId;
  roles: Role[];
}

export enum Role {
  USER,
  ADMIN,
}

// Create DB Schema
const userSchema = new mongoose.Schema<UserModel>({
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
    validate: [validator.isEmail, "Email is not valid"],
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
      validator: function (this: UserModel, el: string) {
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
userSchema.pre(
  "save",
  async function (this: HydratedDocument<UserModel>, next) {
    const userFoundInDb = await userDBHandler.findByEmail(this.email);
    if (userFoundInDb) {
      return next(new AppError("User with such email already exists", 401));
    }
    //Only run this funtion if password was modified
    if (!this.isModified("password")) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password!, 12);
    // Delete the password confirm field
    this.passwordConfirm = undefined;
    next();
  }
);

// Create DB Model
const User = mongoose.model(
  "Users", //this is the collection name. It is lowercase in MongoDB
  userSchema
);

export default User;
