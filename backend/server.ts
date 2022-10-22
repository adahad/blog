import express from "express";
import dotenv from "dotenv";
import postsRouter from "./controllers/posts";

dotenv.config();

const port = process.env.PORT;
if (!port) {
  throw new Error("No port provided");
}

const app = express();
app.use(express.json());

app.use("/", postsRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
