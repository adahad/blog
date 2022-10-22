import express, { Request, Response } from "express";
import { nanoid } from "nanoid";
import * as testData from "../tests/testData.json";
import { Post, isPostBase } from "../types";

const router = express.Router();

let posts: Post[] = testData.samplePosts;

router.get("/", (request: Request, response: Response) => {
  response.json(posts);
});

router.get("/posts/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const queriedPost = posts.find((post) => post.id === id);
  if (queriedPost) {
    response.json(queriedPost);
  } else {
    response.status(404).end();
  }
});

router.delete("/posts/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  posts = posts.filter((post) => post.id !== id);
  response.status(204).end();
});

router.post("/posts", (request: Request, response: Response) => {
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

export default router;
