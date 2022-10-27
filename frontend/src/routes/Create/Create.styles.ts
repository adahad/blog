import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    height: "100%",
    maxHeight: "100%",
    padding: `5% 25%`,
    backgroundColor: `${theme.colors.gray[2]}`,
  },
  stack: {
    height: "100%",
    maxHeight: "100%",
  },
  editor: {
    height: `85%`,
    maxHeight: "85%",
    overflow: "auto",
  },
}));

export default useStyles;
