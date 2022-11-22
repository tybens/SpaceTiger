import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    padding: "30px",
  },

  searchbar: {
    width: "100%",
    marginBottom: "15px",
  },

  searchTextField: {
    width: "100%",
    maxWidth: "600px",
  },

  filters: {
    width: "100%",
    marginBottom: "30px",
    "& .MuiFormControl-root": {
      marginLeft: 0,
      marginRight: "15px",
      // width: "200px",
    },
  },

  spaceContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "1rem",
    justifyContent: "space-between",
    // margin: "30px",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "auto",
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.only("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },

}));
