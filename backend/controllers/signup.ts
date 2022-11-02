/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { isUserSignup } from "../types/userTypes.js";
import User from "../models/user.js";
import { createToken } from "../utils/token.js";

const router = express.Router();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    if (!request.body) {
      response.status(400).json({ error: "No request body" });
      return;
    }
    if (!isUserSignup(request.body)) {
      response
        .status(400)
        .json({ error: "Username, password or name missing" });
      return;
    }

    const { username, name, password } = request.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      response.status(400).json({
        error: "Username is not unique",
      });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      passwordHash,
      name,
    });

    await newUser.save();

    const token = createToken(newUser.username, newUser._id.toString());
    response.status(201).send({
      token,
      username: newUser.username,
      name: newUser.name,
      id: newUser._id.toString(),
    });
  }
);

export default router;
