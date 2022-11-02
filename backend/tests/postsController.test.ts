import mongoose from "mongoose";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import app from "../app.js";
import * as helper from "./testHelper.js";
import { isPostArray, isIdPost } from "../types/postTypes.js";
import UserModel from "../models/user.js";

const api = supertest(app);

const testPosts = helper.initialPosts;

beforeEach(async () => {
  await helper.initializeDbWithPost();
});

describe("GET: /", () => {
  test("All posts are returned", async () => {
    const response = await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(testPosts.length);

    expect(isPostArray(response.body)).toBe(true);
    const body = isPostArray(response.body) ? response.body : [];

    for (let i = 0; i < testPosts.length; i++) {
      const foundPost = body.find(
        (post) =>
          post.title === testPosts[i].title &&
          post.content === testPosts[i].content
      );
      expect(foundPost).not.toBeUndefined();
    }
  });
});

test("Get post", async () => {
  const posts = await helper.getDbPosts();
  const post = posts[0];
  const response = await api
    .get(`/posts/${post.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const body = isIdPost(response.body) ? response.body : undefined;
  expect(body).toEqual(post);
});

describe("POST: /", () => {
  test("Post is added", async () => {
    const user = await UserModel.findOne({
      username: helper.initialUsersPlain[0].username,
    });

    if (!user) {
      throw new Error("Error occurred during testing");
    }

    const newPost = {
      title: "title4",
      content: "content4",
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    };

    const token = jwt.sign(
      {
        username: user.username,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      },
      config.SECRET
    );

    await api
      .post("/posts")
      .send(newPost)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const postsAtEnd = await helper.getDbPosts();
    expect(postsAtEnd).toHaveLength(testPosts.length + 1);

    const addedPost = postsAtEnd.find(
      (post) => post.title === "title4" && post.content === "content4"
    );
    expect(addedPost).not.toBeUndefined();
  });
});

describe("DELETE: /posts", () => {
  test("Post is deleted", async () => {
    const user = await UserModel.findOne({
      username: helper.initialUsersPlain[0].username,
    });

    if (!user) {
      throw new Error("Error occurred during testing");
    }

    const token = jwt.sign(
      {
        username: user.username,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      },
      config.SECRET
    );

    const postsAtStart = await helper.getDbPosts();

    const postToDelete = postsAtStart[0];
    const idToDelete = postToDelete.id;

    await api
      .delete(`/posts/${idToDelete}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const postsAtEnd = await helper.getDbPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length - 1);

    expect(postsAtEnd).not.toContainEqual(postToDelete);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
