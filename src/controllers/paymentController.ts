import { Request, Response, NextFunction } from "express";
import { createWriteStream } from "fs";
import { cartDBHandler } from "../dao/CartRepository";
import { productHandler } from "../dao/ProductRepository";
import catchAsync from "../utils/errorHandler";

const stripe = require('stripe')(`${process.env.STRIPE_TEST_KEY}`);



export const makePayment = catchAsync (async (req: Request, res: Response, next: NextFunction) => {
    if (!res.user) {
        res.status(401).json({
            status: "Unauthorized user. You need to be logged in with this version of the platform.",
        });
        return;
    } 
    {
        const cart = await cartDBHandler.findById(res.user._id.toString());
        if (!cart) {
            res.status(404).json({
                status: "Cart item not found",
            });
            return;
        }

        

        const line_items = cart.cartItems.map(item => {
            const productData = productHandler.fetchProductById(item.productId.toString())
            const productPrice = productHandler.fetchPriceBySize(item.productId.toString(), item.size)

            console.log(productData?.attributes.images.data[0].attributes)

            return {
                price_data: {
                    currency: "EUR",
                    unit_amount: (productPrice || 0) * 100,
                    product_data : {
                        name: productData?.attributes.title,
                        images: ["https://cdn.cichic.com/media/catalog/product/cache/1/image/5e06319eda06f020e43594a9c230972d/1/9/190213100082-1/orange-patchwork-rhinestone-bow-bathing-suit-fashion-bikinis-swimwear.jpg"]
                    }
                },

                quantity: item.quantity,
            }
            
        })


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.DOMAIN}?success=true`,
            cancel_url: `${process.env.DOMAIN}?canceled=true`,
        });
        

        res.status(200).json({
            status: "success",
            data: session.url
        });
        
    }
})