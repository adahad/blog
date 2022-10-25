import { User } from "../types";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: User | null;
    }
  }
}
