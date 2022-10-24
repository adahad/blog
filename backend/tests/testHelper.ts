import Post from "../models/post";
import { Post as PostType, IdPost } from "../types";

const initialPosts: PostType[] = [
  {
    title: "title1",
    content: "content1",
  },
  {
    title: "title2",
    content: "content2",
  },
  {
    title: "title3",
    content: "content3",
  },
];

const getDbPosts = async (): Promise<IdPost[]> => {
  const posts = await Post.find({});
  return posts.map((post) => post.toJSON());
};

export { initialPosts, getDbPosts };
