import { HydratedDocument, Model, Types } from "mongoose";
import Cart, { CartDBModel, CartUserModel } from "../model/cartModel";
import { Product } from "../model/productModel";
import { MongoRepository } from "./MongoRepository";
import { productHandler } from "./ProductRepository";


class CartRepository extends MongoRepository<CartDBModel> {
  constructor(model: Model<CartDBModel>) {
    super(model);
  }

  // totalPrice = cartContext.cartItems.reduce((acc, cartItem, index) => {
  //   const product = cartContext.productItems[index].attributes;
  //   return (
  //     acc +
  //     (product.variations.find((variation) => variation.size === cartItem.size)
  //       ?.discountPrice || 0) *
  //       cartItem.quantity
  //   );
  // }, 0);

  async upsert(id: string, document: CartUserModel[]) {
    console.log("!!!!!!!!!!!!Start: upsert")
    console.log(document)



    const returnedDoc = await this.model.findOneAndUpdate({_id : id}, {_id: id, cartItems: document}, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    console.log(returnedDoc)
    return returnedDoc;
  }

  // async upsertTest() {
    


  //   const returnedDoc = await this.model.findOneAndUpdate({_id : "ABCD"}, {data: cartData}, {
  //     upsert: true,
  //     new: true,
  //     runValidators: true,
  //   });
  //   console.log(returnedDoc);

  //   };


  async deleteFromCart(id: string, document: CartUserModel) {
    console.log("!!!!!!!!!!!!Start: deleteFromCart for id ", id)
    console.log(document)
    const returnedDoc =  await this.model.findByIdAndUpdate(id, { 
        $pull: { 
          cartItems: { 
            _id: document._id} 
        } 
      }, 
      {
        new: true, 
        runValidators: true
      });
      console.log("!!!!!!!!!!!!End: deleteFromCart")
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
