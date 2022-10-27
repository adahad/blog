import { Card } from "@mantine/core";
import { Link } from "react-router-dom";

interface PostProps {
  title: string;
  content: string;
  id: string;
}

function Post({ title, content, id }: PostProps) {
  return (
    <Card shadow="sm" withBorder>
      <Link to={`/posts/${id}`}>{title}</Link>
      <div>{content}</div>
    </Card>
  );
}

export default Post;
