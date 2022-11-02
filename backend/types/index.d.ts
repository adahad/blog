import { HydratedDocument } from "mongoose";
import type { User } from "./userTypes.js";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: HydratedDocument<User> | null;
    }
  }
}
