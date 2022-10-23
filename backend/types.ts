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
  name: string;
}

function isPost(unknown: unknown): unknown is Post {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined
  );
}

function isUserBase(unknown: unknown): unknown is UserBase {
  return (
    (unknown as UserBase).username !== undefined &&
    (unknown as UserBase).password !== undefined &&
    (unknown as UserBase).name !== undefined
  );
}

export { Post, isPost, User, isUserBase };
