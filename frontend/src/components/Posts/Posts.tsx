import { SimpleGrid } from "@mantine/core";
import useStyles from "./Posts.styles";
import Post from "./Post/Post";
import { useAppSelector } from "../../hooks";

function Posts() {
  const posts = useAppSelector((state) => state.posts);
  const { classes } = useStyles();
  return (
    <SimpleGrid className={classes.posts} cols={3} spacing="xl">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </SimpleGrid>
  );
}

export default Posts;
