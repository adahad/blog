/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import { RichTextEditor } from "@mantine/rte";
import {
  Group,
  Stack,
  TextInput,
  Button,
  FileButton,
  Image,
} from "@mantine/core";
// import { TypographyStylesProvider } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./Create.styles";
import { createPost } from "../../api";
import { PostRequest } from "../../types";
import { useAppSelector } from "../../hooks";

function Create() {
  const [postBody, setPostBody] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [titleError, setTitleError] = useState(false);
  const { classes } = useStyles();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user.token) {
      console.log("Must be logged in to make post");
      return;
    }
    if (!title) {
      setTitleError(true);
      return;
    }
    try {
      const post: PostRequest = {
        title,
        content: postBody,
      };
      if (file) {
        post.image = URL.createObjectURL(file);
      }
      const createdPost = await createPost(post, user.token);
      navigate(`/posts/${createdPost.id}`);
      console.log("Post sent successfully");
    } catch (error) {
      console.log("Post sent unsuccessfully");
    }
  };

  return (
    <form className={classes.body} onSubmit={handleSubmit}>
      <Stack className={classes.stack}>
        {file && <Image src={URL.createObjectURL(file)} />}
        <FileButton onChange={setFile}>
          {(props) => <Button {...props}>Set header image</Button>}
        </FileButton>
        <TextInput
          label="Title"
          placeholder="Your post's title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          size="lg"
          error={titleError && "Your post must have a title!"}
        />

        <RichTextEditor
          value={postBody}
          onChange={setPostBody}
          id="rte"
          className={classes.editor}
        />

        <Group>
          <Button type="submit">Submit!</Button>
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default Create;
