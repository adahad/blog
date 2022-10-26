/* eslint-disable import/prefer-default-export */
interface Post {
  title: string;
  content: string;
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

const isAuthResponse = (body: unknown): body is AuthResponse => {
  return (
    (body as AuthResponse).name !== undefined &&
    (body as AuthResponse).token !== undefined &&
    (body as AuthResponse).username !== undefined
  );
};

export type { Post, Login, Signup, AuthResponse };
export { isAuthResponse };
