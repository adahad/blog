import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRouter from "./controllers/posts";
import loginRouter from "./controllers/login";
import signupRouter from "./controllers/signup";
import unknownEndpoint from "./middleware/unknownEndpoint";
import tokenExtractor from "./middleware/tokenExtractor";
import userExtractor from "./middleware/userExtractor";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const MONGODB_URI =
  NODE_ENV === "TEST" ? process.env.TEST_URI : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Database connection URI not provided");
}

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: Error) =>
    console.log("Error connecting to MongoDB", error.message)
  );

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(userExtractor);

app.use("/", postsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.use(unknownEndpoint);

export default app;
