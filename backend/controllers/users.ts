/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { isUserSignup } from "../types";
import User from "../models/user";

const router = express.Router();

router.post(
  "/",
  asyncHandler(
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

      const savedUser = await newUser.save();
      response.status(201).json(savedUser);
    }
  )
);
