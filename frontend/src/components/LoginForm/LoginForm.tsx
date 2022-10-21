import { Center, TextInput, PasswordInput, Stack } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Center>
      <Stack>
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
        <div>
          <Link to="/signup">Sign up!</Link>
        </div>
      </Stack>
    </Center>
  );
}

export default LoginForm;
