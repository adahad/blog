import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRouter from "./controllers/posts";

dotenv.config();

const { PORT, MONGODB_URI } = process.env;
if (!PORT) {
  throw new Error("No port provided");
}

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI provided");
}

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: Error) =>
    console.log("Error connecting to MongoDB", error.message)
  );

app.use(express.json());

app.use("/", postsRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
