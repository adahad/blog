import { IdUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: IdUser | null;
    }
  }
}
