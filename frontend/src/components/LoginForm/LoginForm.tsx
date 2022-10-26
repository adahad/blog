import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./LoginForm.styles";
import { login } from "../../api";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { classes } = useStyles();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({
        username,
        password,
      });
      console.log("Login successful", response);
    } catch (error) {
      console.log("Login unsuccessful");
    }
  };

  return (
    <Stack className={classes.login}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>

      <Anchor component={Link} to="/signup">
        No account? Sign up!
      </Anchor>
    </Stack>
  );
}

export default LoginForm;
