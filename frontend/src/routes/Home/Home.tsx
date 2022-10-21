import { Box } from "@mantine/core";
import Posts from "../../components/Posts/Posts";
import testData from "../../tests/testData.json";
import useStyles from "./Home.styles";
import type { Post } from "../../types";

function Home() {
  const testPosts: Post[] = testData.samplePosts;
  const { classes } = useStyles();

  return (
    <Box className={classes.home}>
      <Posts posts={testPosts} />
    </Box>
  );
}

export default Home;
