import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "TEST") {
    next();
    return;
  }
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("header", request.headers.authorization);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

export default requestLogger;
