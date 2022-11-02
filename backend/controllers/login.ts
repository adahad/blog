import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { isUserBase } from "../types/userTypes.js";
import User from "../models/user.js";
import { createToken } from "../utils/token.js";

const router = express.Router();

router.post(
  "/",

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: "Invalid username or password",
      });
      return;
    }

    const token = createToken(user.username, user._id.toString());

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  }
);

export default router;
