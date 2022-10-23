import { Types } from "mongoose";

interface Post {
  title: string;
  content: string;
}

interface User {
  username: string;
  passwordHash: string;
  name: string;
  posts: Types.DocumentArray<Post>;
}

interface UserBase {
  username: string;
  password: string;
}

interface UserSignup extends UserBase {
  name: string;
}

function isPost(unknown: unknown): unknown is Post {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined
  );
}

function isUserSignup(unknown: unknown): unknown is UserSignup {
  return (
    (unknown as UserSignup).username !== undefined &&
    (unknown as UserSignup).password !== undefined &&
    (unknown as UserSignup).name !== undefined
  );
}

function isUserBase(unknown: unknown): unknown is UserBase {
  return (
    (unknown as UserBase).username !== undefined &&
    (unknown as UserBase).password !== undefined
  );
}

export { Post, isPost, User, UserBase, isUserBase, UserSignup, isUserSignup };
