import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isUserBase } from "../types";
import User from "../models/user";

dotenv.config();
const router = express.Router();

router.get(
  "/",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      if (!request.body) {
        response.status(400).json({ error: "No request body" });
        return;
      }
      if (!isUserBase(request.body)) {
        response
          .status(400)
          .json({ error: "Username, password or name missing" });
        return;
      }

      const { username, password } = request.body;
      const user = await User.findOne({ username });

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        response.status(401).json({
          error: "Invalid username or password",
        });
        return;
      }

      const tokenInfo = {
        username: user.username,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      };

      const { SECRET } = process.env;
      if (!SECRET) {
        throw new Error("Token secret not provided");
      }

      const token = jwt.sign(tokenInfo, SECRET);
      response
        .status(200)
        .send({ token, username: user.username, name: user.name });
    }
  )
);

export default router;
