import { Button, Container } from "@mantine/core";
import useStyles from "./Login.styles";

function Login() {
  const { classes } = useStyles();

  return (
    <Container className={classes.login}>
      <Button>Login</Button>
    </Container>
  );
}

export default Login;
