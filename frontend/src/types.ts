/* eslint-disable import/prefer-default-export */
interface Post {
  title: string;
  content: string;
  user: string;
  id: string;
}

interface Login {
  username: string;
  password: string;
}

interface Signup {
  username: string;
  password: string;
  name: string;
}

interface AuthResponse {
  token: string;
  username: string;
  name: string;
}

interface PostRequest {
  title: string;
  content: string;
}

const isAuthResponse = (body: unknown): body is AuthResponse => {
  return (
    (body as AuthResponse).name !== undefined &&
    (body as AuthResponse).token !== undefined &&
    (body as AuthResponse).username !== undefined
  );
};

const isPost = (unknown: unknown): unknown is Post => {
  return (
    (unknown as Post).title !== undefined &&
    (unknown as Post).content !== undefined &&
    (unknown as Post).user !== undefined &&
    (unknown as Post).id !== undefined
  );
};

const isPostArray = (unknown: unknown): unknown is Post[] => {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return unknown.every(isPost);
};

export type { Post, Login, Signup, AuthResponse, PostRequest };
export { isAuthResponse, isPostArray };
