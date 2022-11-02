import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import * as helper from "./testHelper.js";
import UserModel from "../models/user.js";
import type { UserSignup } from "../types.js";

const api = supertest(app);

beforeEach(async () => {
  await UserModel.deleteMany({});
});

describe("When users exist", () => {
  beforeEach(async () => {
    await helper.initializeDbWithUsers();
  });

  test("User cannot login with existing username", async () => {
    const newUser: UserSignup = {
      name: "name",
      username: "username1",
      password: "password",
    };

    const response = await api
      .post("/signup")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ error: "Username is not unique" });
  });
});

describe("When no users exist", () => {
  test("User can signup", async () => {
    const newUser: UserSignup = {
      name: "name",
      username: "username",
      password: "password",
    };

    await api
      .post("/signup")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const foundUser = await UserModel.exists({ username: newUser.username });
    expect(foundUser).not.toBeNull();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
