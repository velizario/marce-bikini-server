import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRouter";
import cartsRouter from "./routes/cartsRouter";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import { UserModel } from "./model/userModel";
import helmet from "helmet";
import { mailSubscription } from "./controllers/mailSubscriptionController";
import subscribeRouter from "./routes/subscribeRouter";

export const app = express();

declare global {
  namespace Express {
    interface Request {
      // should not be limited to UserModel
      user?: UserModel;
    }
    interface Response {
      // should not be limited to UserModel
      user?: UserModel;
    }
  }
}

async function start() {
  // Security http headers
  app.use(helmet());
  app.use(morgan("dev"));
  // app.use("/", express.static(path.join(__dirname, "../public")));
  app.use(express.json()); //middleware to handle incoming request data i.e. data from  the body is added to the 'req' object argument. This way req.body is available as object

  // Additional middleware which will set headers that we need on each request.
  app.use(function (req: Request, res: Response, next: NextFunction) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      `Access-Control-Allow-Methods`,
      `GET, POST, PUT, PATCH, DELETE, OPTIONS`
    );
    res.setHeader("Access-Control-Max-Age", 3600); // 1 hour
    // Disable caching so we'll always get the latest posts.
    res.setHeader("Cache-Control", "no-cache");

    next();
  });


  // Products router
  // app.use("/api/v1/products", productsRouter);

  // Users Router
  app.use("/api/v1/users", usersRouter);

  // Carts Router
  app.use("/api/v1/carts", cartsRouter);

  // Subscribe Router
  app.use("/api/v1/subscribe", subscribeRouter);

  // Stripe Router
  app.use("api/v1/payment", paymentRouter)

  
  // Default router
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  

  app.use(globalErrorHandler);

  // Defines Route for HTTP method 'get' and for path '/products'. Gets all products
  // app.get("/api/v1/products", getAllProducts);
  // Defines Route for HTTP method 'get' and for path '/products/:id'. Gets single product
  // app.get("/api/v1/products/:id", getSingleProduct);
  // Defines Route for HTTP method 'post' and for path '/api/v1/products'. Creates new product
  // app.post("/api/v1/products", createProduct);
  // Defines Route for HTTP method 'patch' and for path '/api/v1/products'. Updates existing product
  // app.patch("/api/v1/products/:id", updateProduct);
}

start();
