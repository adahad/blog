import { Link } from "react-router-dom";
import { Anchor, Navbar as Sidebar } from "@mantine/core";
import { useState } from "react";
import useStyles from "./Navbar.styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogout } from "../../redux/userSlice";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {
  const [authOpened, setAuthOpened] = useState(false);
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
          <Anchor onClick={() => setAuthOpened(!authOpened)}>Login</Anchor>
        )}
      </Sidebar.Section>

      <AuthModal authOpened={authOpened} setAuthOpened={setAuthOpened} />
    </Sidebar>
  );
}

export default Navbar;
