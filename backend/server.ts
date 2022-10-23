import express, { Request, Response } from "express";
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

// const app = express();
// const port = process.env.PORT;

// if (!port) {
//   throw new Error("No port provided");
// }

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at https://localhost:${port}`);
// });
