import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import PostModel from "../models/post";
import * as helper from "./testHelper";
import { isPostArray, Post } from "../types";

const api = supertest(app);

const testPosts = helper.initialPosts;

beforeEach(async () => {
  await PostModel.deleteMany({});

  const postObjects = testPosts.map((post) => new PostModel(post));
  const postPromises = postObjects.map((post) => post.save());
  await Promise.all(postPromises);
});

describe("GET: /", () => {
  test("Get all posts correctly", async () => {
    const response = await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(testPosts.length);

    expect(isPostArray(response.body)).toBe(true);
    const body: Post[] = isPostArray(response.body) ? response.body : [];

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

describe("POST: /", () => {
  const newPost: Post = {
    title: "title4",
    content: "content4",
  };

  test("Post is added correctly", async () => {
    await api
      .post("/posts")
      .send(newPost)
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
  test("Post is deleted correctly", async () => {
    const postsAtStart = await helper.getDbPosts();

    const postToDelete = postsAtStart[0];
    const idToDelete = postToDelete.id;

    await api.delete(`/posts/${idToDelete}`).expect(204);

    const postsAtEnd = await helper.getDbPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length - 1);

    expect(postsAtEnd).not.toContainEqual(postToDelete);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
