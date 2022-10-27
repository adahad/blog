import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    height: "100%",
    // maxHeight: "100%",
    padding: `5% 25% 0`,
    backgroundColor: `${theme.colors.gray[2]}`,
  },
  stack: {},
  editor: {
    height: `80vh`,
    maxHeight: "80vh",
    overflow: "auto",
  },
}));

export default useStyles;
