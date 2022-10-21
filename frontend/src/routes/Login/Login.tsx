import { Box } from "@mantine/core";
import LoginForm from "../../components/LoginForm/LoginForm";
import useStyles from "./Login.styles";

function Login() {
  const { classes } = useStyles();

  return (
    <Box className={classes.login}>
      <LoginForm />
    </Box>
  );
}

export default Login;
