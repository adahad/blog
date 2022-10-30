import { Card, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { Post as PostType } from "../../../types";
import useStyles from "./Post.styles";

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  const { title, image, id } = post;
  const link = `/posts/${id}`;

  const { classes } = useStyles();

  return (
    <Card shadow="sm" withBorder component={Link} to={link}>
      <Card.Section>
        <Image src={image} height={200} />
      </Card.Section>
      <Text lineClamp={1} className={classes.title} weight={500}>
        {title}
      </Text>
    </Card>
  );
}

export default Post;
