import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Post from "../models/post";
import * as helper from "./testHelper";

const api = supertest(app);

const testPosts = helper.initialPosts;

beforeEach(async () => {
  await Post.deleteMany({});

  const postObjects = testPosts.map((post) => new Post(post));
  const postPromises = postObjects.map((post) => post.save());
  await Promise.all(postPromises);
});

describe("GET: /posts", () => {
  test("Correct number of notes is returned", async () => {
    const response = await api.get("/");
    expect(response.body).toHaveLength(3);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
