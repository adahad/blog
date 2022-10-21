import { Box } from "@mantine/core";
import SignupForm from "../../components/SignupForm/SignupForm";
import useStyles from "./Signup.styles";

function Signup() {
  const { classes } = useStyles();

  return (
    <Box className={classes.signup}>
      <SignupForm />
    </Box>
  );
}

export default Signup;
