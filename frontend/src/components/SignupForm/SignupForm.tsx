import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import { handleAuthResponse, signup } from "../../api";
import { useAppDispatch } from "../../hooks";
import { userRefresh } from "../../redux/userSlice";
import useStyles from "./SignupForm.styles";

interface SignupFormProps {
  openLogin: () => void;
  closeAuth: () => void;
}

function SignupForm({ openLogin, closeAuth }: SignupFormProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== verificationPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    try {
      const response = await signup({
        username,
        password,
        name,
      });
      handleAuthResponse(response);
      dispatch(userRefresh());
      closeAuth();
    } catch (error) {
      setSignupError("Unable to signup");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack className={classes.signup}>
        <TextInput
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={!!signupError}
        />
        <TextInput
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!signupError}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={!!signupError}
        />
        <PasswordInput
          label="Confirm password"
          value={verificationPassword}
          onChange={(event) => setVerificationPassword(event.target.value)}
          error={signupError}
        />
        <Button type="submit">Signup</Button>

        <Anchor onClick={openLogin}>Have an account? Login instead</Anchor>
      </Stack>
    </form>
  );
}

export default SignupForm;
