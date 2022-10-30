import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRouter from "./controllers/posts.js";
import loginRouter from "./controllers/login.js";
import signupRouter from "./controllers/signup.js";
import s3Router from "./controllers/s3.js";
import unknownEndpoint from "./middleware/unknownEndpoint.js";
import tokenExtractor from "./middleware/tokenExtractor.js";
import userExtractor from "./middleware/userExtractor.js";
import requestLogger from "./middleware/requestLogger.js";

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
app.use(requestLogger);
app.use(tokenExtractor);
app.use(userExtractor);

app.use("/", postsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/s3", s3Router);

app.use(unknownEndpoint);

export default app;
