import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { isUserBase } from "../types";
import User from "../models/user";

const router = express.Router();

router.get(
  "/",
  asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {}
  )
);
