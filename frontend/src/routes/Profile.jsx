import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    minHeight: "80vh",
    padding: "0 30px",
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item container direction="row" className={classes.block}>
        Profile
      </Grid>
    </Grid>
  );
}
