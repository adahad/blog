import { Container } from "@mantine/core";
import SignupForm from "../../components/SignupForm/SignupForm";
import useStyles from "./Signup.styles";

function Signup() {
  const { classes } = useStyles();

  return (
    <Container className={classes.login}>
      <SignupForm />
    </Container>
  );
}

export default Signup;
