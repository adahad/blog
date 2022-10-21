import { Container } from "@mantine/core";
import LoginForm from "../../components/LoginForm/LoginForm";
import useStyles from "./Login.styles";

function Login() {
  const { classes } = useStyles();

  return (
    <Container className={classes.login}>
      <LoginForm />
    </Container>
  );
}

export default Login;
