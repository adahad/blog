import { Box } from "@mantine/core";
import { useEffect } from "react";
import Posts from "../../components/Posts/Posts";
import useStyles from "./Home.styles";
import type { Post } from "../../types";
import { refreshPosts } from "../../api";
import { useAppDispatch } from "../../hooks";

function Home() {
  // const testPosts: Post[] = testData.samplePosts;
  const testPosts: Post[] = [];
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshPosts()).catch((error: Error) => {
      console.log("Unable to load posts:", error.message);
    });
  });

  return (
    <Box className={classes.home}>
      <Posts />
    </Box>
  );
}

export default Home;
