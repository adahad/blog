import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./LoginForm.styles";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { classes } = useStyles();

  return (
    <Stack className={classes.login}>
      <TextInput
        label="Username"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button>Login</Button>
      <Anchor component={Link} to="/signup">
        No account? Sign up!
      </Anchor>
    </Stack>
  );
}

export default LoginForm;
