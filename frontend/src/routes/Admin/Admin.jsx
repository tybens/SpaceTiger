import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import NewSpaces from "./NewSpaces";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

export default function Admin() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <NewSpaces />
      {/* <MyReviews reviews={reviewData?.reviews} /> */}
    </Grid>
  );
}
