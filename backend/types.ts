interface Post {
  title: string;
  content: string;
}

interface User {
  username: string;
  passwordHash: string;
  name: string;
}

function isPost(unknown: unknown): unknown is Post {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined
  );
}

export { Post, isPost, User };
