/* eslint-disable react/no-danger */
import { RichTextEditor } from "@mantine/rte";
import { Group, Stack, TextInput, Button, Box } from "@mantine/core";
// import { TypographyStylesProvider } from "@mantine/core";
import { useState } from "react";
import useStyles from "./Create.styles";
import { createPost } from "../../api";
import { PostRequest } from "../../types";
import { useAppSelector } from "../../hooks";

function Create() {
  const [postBody, setPostBody] = useState("");
  const [title, setTitle] = useState("");
  const { classes } = useStyles();
  const user = useAppSelector((state) => state.user);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user.token) {
      console.log("Must be logged in to make post");
      return;
    }
    try {
      const post: PostRequest = {
        title,
        content: postBody,
      };
      await createPost(post, user.token);
      console.log("Post sent successfully");
    } catch (error) {
      console.log("Post sent unsuccessfully");
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Stack className={classes.stack}>
        <TextInput
          label="Title"
          placeholder="Your post's title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <RichTextEditor
          value={postBody}
          onChange={setPostBody}
          id="rte"
          className={classes.editor}
        />

        <Group>
          <Button type="submit">Submit!</Button>
          <Button>Cancel</Button>
        </Group>
        {/* <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </TypographyStylesProvider> */}
      </Stack>
    </form>
  );
}

export default Create;
