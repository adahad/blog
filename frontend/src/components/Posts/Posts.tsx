import { SimpleGrid } from "@mantine/core";
import type { Post as IPost } from "../../types";
import useStyles from "./Posts.styles";
import Post from "./Post/Post";

interface PostsProps {
  posts: IPost[];
}

function Posts({ posts }: PostsProps) {
  const { classes } = useStyles();
  return (
    <SimpleGrid className={classes.posts} cols={3} spacing="xl">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </SimpleGrid>
  );
}

export default Posts;
