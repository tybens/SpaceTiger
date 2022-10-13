import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "2px solid black",
    color: "inherit",
    backgroundColor: "inherit",
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "transparent",
      borderBottom: "none",
      borderRadius: "none",
    },

    padding: "40px 40px 0 40px",
  },
  titleDiv: {
    height: 35,
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",

    [theme.breakpoints.up("xs")]: {
      height: 50,
    },
    [theme.breakpoints.up("sm")]: {
      height: 75,
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    textDecoration: "none",
    fontSize: "56px",
    letterSpacing: "-0.01em",
    fontWeight: "bold !important",
    marginTop: "0",
  },

  image: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    transition: "all 0.25s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  navLink: {
    color: "inherit",
    position: "relative",
    textDecoration: "none",
    zIndex: 2,
  },
}));
