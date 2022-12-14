import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { isLoginResponse } from "../types/testTypes.js";
import type { UserBase } from "../types/userTypes.js";
import * as helper from "./testHelper.js";

const api = supertest(app);

describe("When users exist", () => {
  beforeEach(async () => {
    await helper.initializeDbWithUsers();
  });

  test("User can login", async () => {
    const user: UserBase = {
      username: "username1",
      password: "password1",
    };

    const response = await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const body = isLoginResponse(response.body) ? response.body : undefined;

    expect(body?.name).toBe("name1");
    expect(body?.username).toBe("username1");
    expect(body?.token).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
