/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import Post from "../models/post.js";

const router = express.Router();

router.patch(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const post = await Post.findById(id);
    const user = request.user;

    if (!user) {
      response.status(401).end();
      return;
    }

    if (!post) {
      response.status(404).end();
      return;
    }

    if (post.likes.includes(user._id)) {
      response.status(403).end();
      return;
    }

    await post.updateOne({ likes: post.likes.concat(user._id) });
    response.status(200).end();
  }
);

router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const post = await Post.findById(id);
    const user = request.user;

    if (!user) {
      response.status(401).end();
      return;
    }

    if (!post) {
      response.status(404).end();
      return;
    }

    if (!post.likes.includes(user._id)) {
      response.status(403).end();
      return;
    }

    const newLikes = post.likes.filter(
      (likesId) => likesId.toString() !== user._id.toString()
    );
    await post.updateOne({ likes: newLikes });
    response.status(200).end();
  }
);

export default router;
