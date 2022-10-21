/* eslint-disable react/no-danger */
import { RichTextEditor } from "@mantine/rte";
import { Stack, TextInput } from "@mantine/core";
// import { TypographyStylesProvider } from "@mantine/core";
import { useState } from "react";

function Create() {
  const [postBody, setPostBody] = useState("");
  const [title, setTitle] = useState("");

  return (
    <Stack>
      <TextInput
        label="Title"
        placeholder="Your post's title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <RichTextEditor value={postBody} onChange={setPostBody} id="rte" />
      {/* <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </TypographyStylesProvider> */}
    </Stack>
  );
}

export default Create;
