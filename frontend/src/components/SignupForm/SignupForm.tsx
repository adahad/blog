import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./SignupForm.styles";

function SignupForm() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");

  const { classes } = useStyles();

  return (
    <Stack className={classes.signup}>
      <TextInput
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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
      <PasswordInput
        label="Confirm password"
        value={verificationPassword}
        onChange={(event) => setVerificationPassword(event.target.value)}
      />
      <Button>Signup</Button>

      <Anchor component={Link} to="/login">
        Login instead
      </Anchor>
    </Stack>
  );
}

export default SignupForm;
