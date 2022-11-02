import type { Types } from "mongoose";

interface PostBase {
  title: string;
  content: string;
  image?: string;
}

interface Post extends PostBase {
  user: Types.ObjectId;
  likes: Types.ObjectId[];
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

const isPostArray = (unknown: unknown): unknown is Post[] => {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return unknown.every(isPost);
};

export type { PostBase, Post };
export { isPostBase, isPost, isPostArray };
