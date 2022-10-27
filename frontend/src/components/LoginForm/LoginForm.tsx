import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import useStyles from "./LoginForm.styles";
import { handleAuthResponse, login } from "../../api";
import { useAppDispatch } from "../../hooks";
import { userRefresh } from "../../redux/userSlice";

interface LoginFormProps {
  openSignup: () => void;
  closeAuth: () => void;
}

function LoginForm({ openSignup, closeAuth }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({
        username,
        password,
      });
      handleAuthResponse(response);
      dispatch(userRefresh());
      closeAuth();
    } catch (error) {
      setLoginError("Username or password incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="xl" className={classes.login}>
        <TextInput
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!loginError}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={loginError}
        />
        <Button type="submit">Login</Button>
        <Anchor onClick={openSignup}>No account? Signup!</Anchor>
      </Stack>
    </form>
  );
}

export default LoginForm;
