import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });
import { app } from "./app";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      JWT_SECRET: string;
      DATABASE_PASSWORD: string;
      DATABASE_PASS_PLACEHOLDER: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

const PORT = process.env.PORT || 9000;

const DB = process.env.DATABASE.replace(
  process.env.DATABASE_PASS_PLACEHOLDER,
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    autoIndex: true, //make this also true
  })
  .then(() => {
    console.log("DB connection successful!");
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
