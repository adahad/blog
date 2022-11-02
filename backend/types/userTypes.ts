import type { Types } from "mongoose";

interface User {
  username: string;
  passwordHash: string;
  name: string;
  posts: Types.ObjectId[];
}

interface UserBase {
  username: string;
  password: string;
}

interface UserSignup extends UserBase {
  name: string;
}

const isUserSignup = (unknown: unknown): unknown is UserSignup => {
  return (
    (unknown as UserSignup).username !== undefined &&
    (unknown as UserSignup).password !== undefined &&
    (unknown as UserSignup).name !== undefined
  );
};

const isUserBase = (unknown: unknown): unknown is UserBase => {
  return (
    (unknown as UserBase).username !== undefined &&
    (unknown as UserBase).password !== undefined
  );
};

export type { User, UserBase, UserSignup };
export { isUserSignup, isUserBase };
