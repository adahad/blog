import { SimpleGrid } from "@mantine/core";
import type { Post as IPost } from "../../types";
import Post from "./Post/Post";

interface PostsProps {
  posts: IPost[];
}

function Posts({ posts }: PostsProps) {
  return (
    <SimpleGrid cols={3}>
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </SimpleGrid>
  );
}

export default Posts;
