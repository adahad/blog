import { Card, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface PostProps {
  title: string;
  id: string;
}

function Post({ title, id }: PostProps) {
  const link = `/posts/${id}`;

  return (
    <Card shadow="sm" withBorder component={Link} to={link}>
      <Text lineClamp={1}>{title}</Text>
    </Card>
  );
}

export default Post;
