import type { Post } from "./postTypes.js";

interface LoginResponse {
  name: string;
  token: string;
  username: string;
}

const isLoginResponse = (unknown: unknown): unknown is LoginResponse => {
  return (
    (unknown as LoginResponse).username !== undefined &&
    (unknown as LoginResponse).name !== undefined &&
    (unknown as LoginResponse).token !== undefined
  );
};

interface IdPost extends Post {
  id: string;
}

const isIdPost = (unknown: unknown): unknown is IdPost => {
  return (
    (unknown as IdPost).title !== undefined &&
    (unknown as IdPost).content !== undefined &&
    (unknown as IdPost).id !== undefined
  );
};

export { LoginResponse, isLoginResponse, IdPost, isIdPost };
