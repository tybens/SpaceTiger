import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import Favorites from "./components/Favorites";
import MyReviews from "./components/MyReviews";
import MySpaces from "./components/MySpaces";
import { UserContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

export default function Profile() {
  const { user } = useContext(UserContext);

  const classes = useStyles();



  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Favorites user={user} />
      <MyReviews user={user} />
      <MySpaces user={user} />
    </Grid>
  );
}
