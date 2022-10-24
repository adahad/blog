import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./testHelper";
import UserModel from "../models/user";

const api = supertest(app);

beforeEach(async () => {
  await UserModel.deleteMany({});
});

describe("When users exist", () => {
  beforeEach(async () => {
    const initialUsers = helper.initialUsers;
    const userObjects = initialUsers.map((user) => new UserModel(user));
    const userPromises = userObjects.map((user) => user.save());
    await Promise.all(userPromises);
  });
});

describe("When no users exist", () => {});

afterAll(async () => {
  await mongoose.connection.close();
});
