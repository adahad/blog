import { Center, TextInput, PasswordInput, Stack } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");

  return (
    <Center>
      <Stack>
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
        <div>
          <Link to="/login">Login!</Link>
        </div>
      </Stack>
    </Center>
  );
}

export default SignupForm;
