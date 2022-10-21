import { Navbar as Sidebar } from "@mantine/core";
import useStyles from "./Navbar.styles";

function Navbar() {
  const { classes } = useStyles();
  return (
    <Sidebar width={{ sm: 200, lg: 300, base: 100 }} p="xs">
      <Sidebar.Section>
        <div>Read</div>
        <div>Write</div>
      </Sidebar.Section>
      <Sidebar.Section className={classes.footer}>
        <div>Log out</div>
      </Sidebar.Section>
    </Sidebar>
  );
}

export default Navbar;
