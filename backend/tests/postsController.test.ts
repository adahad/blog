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
    const response = await api.get("/");
    expect(response.body).toHaveLength(testPosts.length);
    expect(isPostArray(response.body)).toBe(true);
    const body: Post[] = isPostArray(response.body) ? response.body : [];

    for (let i = 0; i < testPosts.length; i++) {
      expect(body[i].title).toBe(testPosts[i].title);
      expect(body[i].content).toBe(testPosts[i].content);
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
