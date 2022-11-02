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

export { LoginResponse, isLoginResponse };
