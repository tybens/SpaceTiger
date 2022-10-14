import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
}));

export default function Search() {
  const classes = useStyles();
  
  return (
    <Grid container className={classes.container}>
      <h1>Search Page</h1>
    </Grid>
    // <div className={classes.container}>
    //   {/* <div className={classes.fakeNavBar} /> */}
    //   <NavBar />
    //   <h1> Search Page </h1>
    // </div>
  );
}
