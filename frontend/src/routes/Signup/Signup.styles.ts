import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  login: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${theme.colors.gray[2]}`,
  },
}));

export default useStyles;
