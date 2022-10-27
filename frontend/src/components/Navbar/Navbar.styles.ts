import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  navbar: {
    padding: "35vh 1vw",
    textAlign: "center",
    fontSize: `${theme.fontSizes.lg}`,
  },
  link: {
    display: "block",
    fontSize: theme.fontSizes.xl,

    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.colors.blue[2],
    },
  },
}));

export default useStyles;
