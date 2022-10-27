import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  navbar: {
    padding: "30vh 0",
    textAlign: "center",
  },
  link: {
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.xl,

    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.colors.blue[1],
    },
  },
}));

export default useStyles;
