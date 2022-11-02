import type { Types } from "mongoose";

interface PostBase {
  title: string;
  content: string;
  image?: string;
}

interface Post extends PostBase {
  user: Types.ObjectId;
}

interface IdPost extends Post {
  id: string;
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
    (unknown as Post).content !== undefined &&
    (unknown as Post).user !== undefined
  );
};

const isIdPost = (unknown: unknown): unknown is IdPost => {
  return (
    (unknown as IdPost).title !== undefined &&
    (unknown as IdPost).content !== undefined &&
    (unknown as IdPost).id !== undefined
  );
};

const isPostArray = (unknown: unknown): unknown is Post[] => {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return unknown.every(isPost);
};

export type { PostBase, Post, IdPost };
export { isPostBase, isPost, isIdPost, isPostArray };
