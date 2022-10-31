import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  PostPage: {
    padding: `5% 25% 0`,
    // border: `1px solid black`,
    height: "100%",
    backgroundColor: `${theme.colors.gray[2]}`,
  },
  PostBody: {
    // border: `1px solid ${theme.colors.gray[5]}`,
    padding: `2% 5%`,
    height: "100%",
    backgroundColor: "white",
    overflowWrap: "break-word",
  },
  image: {
    marginTop: theme.spacing.xl,
  },
}));

export default useStyles;
