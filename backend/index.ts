import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import * as testData from "./tests/testData.json";

import { Post } from "./types";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

let posts: Post[] = testData.samplePosts;

app.get("/", (request: Request, response: Response) => {
  response.json(posts);
});

app.get("/posts/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const post = posts.find((post) => post.id === id);
  if (post) {
    response.json(post);
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
  const body = request.body;

  if (!body.content || !body.title) {
    return response.status(400).json({ error: "Header or title missing" });
  }

  const id = nanoid();

  const newPost: Post = {
    title: request.body.title,
    content: request.body.content,
    id,
  };

  posts = posts.concat(newPost);
  response.json(posts);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
