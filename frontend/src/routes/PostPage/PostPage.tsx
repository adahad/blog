/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Title,
  TypographyStylesProvider,
  Stack,
  Image,
  Button,
} from "@mantine/core";
import { deletePost, getPost } from "../../api";
import { Post } from "../../types";
import useStyles from "./PostPage.styles";
import { useAppSelector } from "../../hooks";

function PostPage() {
  const [post, setPost] = useState<Post>();
  const location = useLocation();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    async function fetchPost() {
      const response = await getPost(id);
      setPost(response);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPost();
  }, []);

  if (!post) {
    return <div>Couldnt fetch post</div>;
  }

  const displayDelete = user.id === post.user;

  const handleDelete = async () => {
    if (!user.token) {
      console.log("Must be logged in to delete post");
      return;
    }

    try {
      await deletePost(post.id, user.token);
      navigate("/");
    } catch (error) {
      console.log("Unable to delete");
    }
  };

  return (
    <Box className={classes.PostPage}>
      <Stack className={classes.PostBody}>
        {post.image && <Image src={post.image} className={classes.image} />}
        <Title>{post.title}</Title>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </TypographyStylesProvider>
        {displayDelete && (
          <Button color="red" onClick={handleDelete}>
            Delete post
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default PostPage;
