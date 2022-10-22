import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import * as testData from "./tests/testData.json";

import { Post, isPostBase } from "./types";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
if (!port) {
  throw new Error("No port provided");
}

let posts: Post[] = testData.samplePosts;

app.get("/", (request: Request, response: Response) => {
  response.json(posts);
});

app.get("/posts/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const queriedPost = posts.find((post) => post.id === id);
  if (queriedPost) {
    response.json(queriedPost);
  } else {
    response.status(404).end();
  }
});

app.delete("/posts/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  posts = posts.filter((post) => post.id !== id);
  response.status(204).end();
});

app.post("/posts", (request: Request, response: Response) => {
  if (!request.body) {
    return response.status(400).json({ error: "No request body" });
  }
  if (!isPostBase(request.body)) {
    return response.status(400).json({ error: "Header or title missing" });
  }

  const newPost: Post = {
    title: request.body.title,
    content: request.body.content,
    id: nanoid(),
  };

  posts = posts.concat(newPost);
  return response.json(posts);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
