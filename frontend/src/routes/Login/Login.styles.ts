import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  login: {
    border: `1px solid ${theme.colors.gray[2]}`,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default useStyles;
