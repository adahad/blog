import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import UserModel from "../models/user.js";

const isTokenPayload = (
  payload: jwt.JwtPayload | string
): payload is TokenPayload => {
  return (
    (payload as TokenPayload).id !== undefined &&
    (payload as TokenPayload).username !== undefined
  );
};

const userExtractor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.token) {
    next();
    return;
  }

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!isTokenPayload(decodedToken)) {
    response.status(401).json({ error: "token missing or invalid" });
    return;
  }

  const user = await UserModel.findById(decodedToken.id);
  request.user = user;
  next();
};

interface TokenPayload {
  username: string;
  id: string;
}

export default userExtractor;
