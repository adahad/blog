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

const isPost = (unknown: unknown): unknown is Post => {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined
  );
};

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

const isPostArray = (unknown: unknown): unknown is Post[] => {
  if (!Array.isArray(unknown)) {
    return false;
  }
  // for (let i = 0; i < unknown.length; i++) {
  //   if (!isPost(unknown)) {
  //     return false;
  //   }
  // }
  // return true;
  return unknown.every(isPost);
};

export {
  Post,
  isPost,
  User,
  UserBase,
  isUserBase,
  UserSignup,
  isUserSignup,
  isPostArray,
};
