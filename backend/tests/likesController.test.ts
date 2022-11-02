import mongoose, { HydratedDocument } from "mongoose";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import app from "../app.js";
import * as helper from "./testHelper.js";
import UserModel from "../models/user.js";
import PostModel from "../models/post.js";
import type { User } from "../types/userTypes.js";

const api = supertest(app);

beforeEach(async () => {
  await helper.initializeDbWithPost();
});

describe("When logged in", () => {
  let token: string;
  let user: HydratedDocument<User> | null;

  beforeEach(async () => {
    user = await UserModel.findOne({
      username: helper.initialUsersPlain[0].username,
    });

    if (!user) {
      throw new Error("Error occurred during testing");
    }

    token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      config.SECRET
    );
  });

  test("Post is liked", async () => {
    const initialPosts = await helper.getDbPosts();
    const beforeLikePost = initialPosts[0];

    await api
      .patch(`/likes/${beforeLikePost.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    const afterPosts = await helper.getDbPosts();
    const afterLikePost = afterPosts[0];

    expect(afterLikePost.likes).toHaveLength(1);
  });

  test("Liked post is unliked", async () => {
    const newPost = new PostModel({
      title: "title",
      content: "content",
      user: user?._id,
      likes: [user?._id],
    });
    await newPost.save();
    console.log(newPost);

    const id = newPost._id.toString();
    await api
      .delete(`/likes/${id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    const afterPosts = await helper.getDbPosts();
    const afterLikePost = afterPosts[0];

    expect(afterLikePost.likes).toHaveLength(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
