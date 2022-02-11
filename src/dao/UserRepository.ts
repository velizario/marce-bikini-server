import { HydratedDocument, Model } from "mongoose";
import User, { UserModel } from "../model/userModel";
import { MongoRepository } from "./MongoRepository";
import bcrypt from "bcryptjs";

class UserRepository extends MongoRepository<UserModel> {
  constructor(model: Model<UserModel>) {
    super(model);
  }

  async findByEmail(
    email: string
  ): Promise<HydratedDocument<UserModel> | null> {
    const user = await this.model.findOne({ email: email });
    return user;
  }

  async validatePasswordByEmail(
    email: string,
    candidatePassword: string
  ): Promise<false | UserModel> {
    const user = await this.model.findOne({ email: email }).select("+password");
    if (user && (await bcrypt.compare(candidatePassword, user.password!)))
      return user;
    return false;
  }
}

export const userDBHandler = new UserRepository(User);
