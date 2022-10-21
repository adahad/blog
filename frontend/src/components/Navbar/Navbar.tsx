import { Link } from "react-router-dom";
import { Navbar as Sidebar } from "@mantine/core";
import useStyles from "./Navbar.styles";

function Navbar() {
  const { classes } = useStyles();
  return (
    <Sidebar width={{ sm: 200, lg: 300, base: 100 }} p="xs">
      <Sidebar.Section>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="new">Write</Link>
        </div>
      </Sidebar.Section>
      <Sidebar.Section className={classes.footer}>
        <Link to="login">Login</Link>
      </Sidebar.Section>
    </Sidebar>
  );
}

export default Navbar;
