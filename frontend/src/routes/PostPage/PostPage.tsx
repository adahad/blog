/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Title, TypographyStylesProvider, Stack } from "@mantine/core";
import { getPost } from "../../api";
import { Post } from "../../types";
import useStyles from "./PostPage.styles";

function PostPage() {
  const [post, setPost] = useState<Post>();
  const location = useLocation();
  const { classes } = useStyles();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchPost() {
      const response = await getPost(id);
      setPost(response);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPost();
  });

  if (!post) {
    return <div>Couldnt fetch post</div>;
  }

  return (
    <Box className={classes.PostPage}>
      <Stack className={classes.PostBody}>
        <Title>{post.title}</Title>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </TypographyStylesProvider>
      </Stack>
    </Box>
  );
}

export default PostPage;
