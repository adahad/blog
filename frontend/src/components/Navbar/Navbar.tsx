import { Link } from "react-router-dom";
import { Anchor, Navbar as Sidebar, Stack } from "@mantine/core";
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
    <div>
      <Sidebar
        width={{ sm: 200, lg: 300, base: 100 }}
        className={classes.navbar}
      >
        <Stack spacing={0}>
          <Anchor component={Link} to="/" className={classes.link}>
            Home
          </Anchor>
          <Anchor component={Link} to="/create" className={classes.link}>
            Create
          </Anchor>

          {user.token ? (
            <Anchor onClick={logout} className={classes.link}>
              Logout
            </Anchor>
          ) : (
            <Anchor
              onClick={() => setAuthOpened(!authOpened)}
              className={classes.link}
            >
              Login
            </Anchor>
          )}
        </Stack>
      </Sidebar>
      <AuthModal authOpened={authOpened} setAuthOpened={setAuthOpened} />
    </div>
  );
}

export default Navbar;
