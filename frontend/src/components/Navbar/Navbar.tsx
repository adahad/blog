import { Link } from "react-router-dom";
import { Anchor, Navbar as Sidebar, Modal } from "@mantine/core";
import { useState } from "react";
import useStyles from "./Navbar.styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogout } from "../../redux/userSlice";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

function Navbar() {
  const [authOpened, setAuthOpened] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(true);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(userLogout());
  };

  const swapAuth = () => {
    setDisplayLogin(!displayLogin);
  };

  const closeAuth = () => {
    setAuthOpened(false);
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
          <Anchor onClick={() => setAuthOpened(!authOpened)}>Login</Anchor>
        )}
      </Sidebar.Section>

      <Modal centered opened={authOpened} onClose={() => setAuthOpened(false)}>
        {displayLogin ? (
          <LoginForm openSignup={swapAuth} closeAuth={closeAuth} />
        ) : (
          <SignupForm openLogin={swapAuth} closeAuth={closeAuth} />
        )}
      </Modal>
    </Sidebar>
  );
}

export default Navbar;
