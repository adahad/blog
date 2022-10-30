import { Card, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { Post as PostType } from "../../../types";

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  const { title, image, id } = post;
  const link = `/posts/${id}`;

  return (
    <Card shadow="sm" withBorder component={Link} to={link}>
      <Card.Section>
        <Image src={image} />
      </Card.Section>
      <Text lineClamp={1}>{title}</Text>
    </Card>
  );
}

export default Post;
