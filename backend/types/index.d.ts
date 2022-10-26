import { HydratedDocument } from "mongoose";
import { User } from "../types";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: HydratedDocument<User> | null;
    }
  }
}
