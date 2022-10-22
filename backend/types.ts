interface Post {
  title: string;
  content: string;
  id: string;
}

type PostBase = Omit<Post, "id">;

function isPostBase(unknown: unknown): unknown is PostBase {
  return (
    (unknown as PostBase).title !== undefined &&
    (unknown as PostBase).content !== undefined
  );
}

export { Post, PostBase, isPostBase };
