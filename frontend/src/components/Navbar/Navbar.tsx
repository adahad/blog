import { Link } from "react-router-dom";
import { Anchor, Navbar as Sidebar, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import useStyles from "./Navbar.styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogout } from "../../redux/userSlice";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

function Navbar() {
  const [loginOpened, setLoginOpened] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(true);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(userLogout());
  };

  return (
    <Sidebar width={{ sm: 200, lg: 300, base: 100 }} p="xs">
      <Sidebar.Section grow>
        <div>
          <Anchor component={Link} to="/">
            Home
          </Anchor>
        </div>

        <div>
          <Anchor component={Link} to="/create">
            Create
          </Anchor>
        </div>
      </Sidebar.Section>

      <Sidebar.Section className={classes.footer}>
        {user.token ? (
          <Anchor onClick={logout}>Logout</Anchor>
        ) : (
          <Anchor onClick={() => setLoginOpened(!loginOpened)}>Login</Anchor>
        )}
      </Sidebar.Section>

      <Modal
        centered
        opened={loginOpened}
        onClose={() => setLoginOpened(false)}
      >
        {/* <LoginForm /> */}
        {displayLogin ? (
          <Stack spacing="xs">
            <LoginForm />
            <Anchor
              align="center"
              onClick={() => setDisplayLogin(!displayLogin)}
            >
              No account? Signup
            </Anchor>
          </Stack>
        ) : (
          <Stack spacing="xs">
            <SignupForm />
            <Anchor
              align="center"
              onClick={() => setDisplayLogin(!displayLogin)}
            >
              Have an account? Login
            </Anchor>
          </Stack>
        )}
      </Modal>
    </Sidebar>
  );
}

export default Navbar;
