import { HydratedDocument, Model } from "mongoose";
import Cart, { CartDBModel, CartUserModel } from "../model/cartModel";
import { Product } from "../model/productModel";
import { MongoRepository } from "./MongoRepository";


class CartRepository extends MongoRepository<CartDBModel> {
  constructor(model: Model<CartDBModel>) {
    super(model);
  }

  async upsert(id: string, document: CartDBModel) {
    const returnedDoc = await this.model.findOneAndUpdate({_id : id}, document, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    return returnedDoc;
  }

  async deleteFromCart(id: string, document: CartUserModel) {
    const returnedDoc =  await this.model.findByIdAndUpdate(id, { 
        $pull: { 
          data: { 
            _id: document._id} 
        } 
      }, 
      {
        new: true, 
        runValidators: true
      });
    return returnedDoc;
    
    //    this.model.findById(id).lean().exec((err: any, collection: any) => {
    //   const returnedDoc = collection.data.filter((product: CartUserModel) => {
    //      return JSON.stringify(document) !== JSON.stringify({...product, _id: product._id?.toString()})
    //     });
    //    });
  }

  //NOTE: This is for adding the user ID before. Add middleare to enrich the product
  // async addToCart(product: CartDBModel) {
  //   this.add(product);
  // }
}

export const cartDBHandler = new CartRepository(Cart);
