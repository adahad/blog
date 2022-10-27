import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TypographyStylesProvider } from "@mantine/core";
import { getPost } from "../../api";
import { Post } from "../../types";

function PostPage() {
  const [post, setPost] = useState<Post>();
  const location = useLocation();
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
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </TypographyStylesProvider>
  );
}

export default PostPage;
