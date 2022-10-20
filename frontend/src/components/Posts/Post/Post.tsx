import { Card } from "@mantine/core";

interface PostProps {
  title: string;
  content: string;
}

function Post({ title, content }: PostProps) {
  return (
    <Card shadow="sm" withBorder>
      <div>{title}</div>
      <div>{content}</div>
    </Card>
  );
}

export default Post;
