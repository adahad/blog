/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isPostBase } from "../types";
import Post from "../models/post";
import UserModel from "../models/user";

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
      const user = request.user;
      if (!user) {
        response.status(400).json({ error: "User not logged in" });
        return;
      }

      const id = request.params.id;
      const postToDelete = await Post.findById(id);
      if (postToDelete?.user.toString() !== user._id.toString()) {
        response.status(404).end();
        return;
      }
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
        return;
      }

      if (!request.body) {
        response.status(400).json({ error: "No request body" });
        return;
      }
      if (!isPostBase(request.body)) {
        response.status(400).json({ error: "Header or title missing" });
        return;
      }

      const user = request.user;
      if (!user) {
        response.status(400).json({ error: "User not logged in" });
        return;
      }

      const newPost = new Post({
        title: request.body.title,
        content: request.body.content,
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
      });

      const savedPost = await newPost.save();
      // eslint-disable-next-line no-underscore-dangle
      user.posts = user.posts.concat(savedPost._id);

      response.status(201).json(newPost);
    }
  )
);

export default router;
