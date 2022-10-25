/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isPost } from "../types";
import Post from "../models/post";

const router = express.Router();

router.get(
  "/",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const posts = await Post.find({});
      response.json(posts);
    }
  )
);

router.get(
  "/posts/:id",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id;
      const post = await Post.findById(id);
      response.json(post);
    }
  )
);

router.delete(
  "/posts/:id",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id;

      await Post.findByIdAndDelete(id);
      response.status(204).end();
    }
  )
);

router.post(
  "/posts",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      if (!request.user) {
        response.status(400).json({ error: "User not logged in" });
      }

      if (!request.body) {
        response.status(400).json({ error: "No request body" });
        return;
      }
      if (!isPost(request.body)) {
        response.status(400).json({ error: "Header or title missing" });
        return;
      }

      const newPost = new Post({
        title: request.body.title,
        content: request.body.content,
      });

      await newPost.save();

      response.status(201).json(newPost);
    }
  )
);

export default router;
