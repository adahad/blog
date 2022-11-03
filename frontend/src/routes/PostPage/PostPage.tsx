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
  Affix,
} from "@mantine/core";
import { deletePost, getPost, likePost, unlikePost } from "../../api";
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

  const toggleLikes = async () => {
    if (!user.id || !user.token) {
      console.log("Must be logged in to like");
      return;
    }
    if (!post.likes.includes(user.id)) {
      try {
        await likePost(post.id, user.token);
        const response = await getPost(id);
        setPost(response);
      } catch (error) {
        console.log("Unable to like post");
      }
    } else {
      try {
        await unlikePost(post.id, user.token);
        const response = await getPost(id);
        setPost(response);
      } catch (error) {
        console.log("Unable to unlike post");
      }
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
      <Affix position={{ top: "20vh", right: "10vw" }}>
        <Button onClick={toggleLikes}>Likes: {post.likes.length}</Button>
      </Affix>
    </Box>
  );
}

export default PostPage;
