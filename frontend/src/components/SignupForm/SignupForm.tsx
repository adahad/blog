import { TextInput, PasswordInput, Stack, Anchor, Button } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleAuthResponse, signup } from "../../api";
import { useAppDispatch } from "../../hooks";
import { userRefresh } from "../../redux/userSlice";
import useStyles from "./SignupForm.styles";

function SignupForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== verificationPassword) {
      console.log("Passwords do not match");
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
      navigate("/");
      console.log("Signup successful", response);
    } catch (error) {
      console.log("Signup unsuccessful");
    }
  };

  return (
    <Stack className={classes.signup}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <PasswordInput
          label="Confirm password"
          value={verificationPassword}
          onChange={(event) => setVerificationPassword(event.target.value)}
        />
        <Button type="submit">Signup</Button>
      </form>

      <Anchor component={Link} to="/login">
        Login instead
      </Anchor>
    </Stack>
  );
}

export default SignupForm;
