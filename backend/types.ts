import { Types } from "mongoose";

interface PostBase {
  title: string;
  content: string;
}

interface Post extends PostBase {
  user: Types.ObjectId;
}

interface IdPost extends Post {
  id: string;
}

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

interface LoginResponse {
  name: string;
  token: string;
  username: string;
}

const isPostBase = (unknown: unknown): unknown is PostBase => {
  return (
    (unknown as PostBase).title !== undefined &&
    (unknown as PostBase).content !== undefined
  );
};

const isPost = (unknown: unknown): unknown is Post => {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined
  );
};

const isIdPost = (unknown: unknown): unknown is IdPost => {
  return (
    (unknown as IdPost).title !== undefined &&
    (unknown as IdPost).content !== undefined &&
    (unknown as IdPost).id !== undefined
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

  return unknown.every(isPost);
};

const isLoginResponse = (unknown: unknown): unknown is LoginResponse => {
  return (
    (unknown as LoginResponse).username !== undefined &&
    (unknown as LoginResponse).name !== undefined &&
    (unknown as LoginResponse).token !== undefined
  );
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
  IdPost,
  isIdPost,
  LoginResponse,
  isLoginResponse,
  isPostBase,
};
