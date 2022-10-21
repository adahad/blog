import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Root() {
  return (
    <AppShell navbar={<Navbar />}>
      <Outlet />
    </AppShell>
  );
}

export default Root;
