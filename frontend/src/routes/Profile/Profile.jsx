import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import Favorites from "./components/Favorites";
import MyReviews from "./components/MyReviews";
import data from "../Details/details.json";
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

  const [reviewData, setReviewData] = useState(null);
  const classes = useStyles();

  const getData = () => {
    // TODO: query database for all reviews from a specific user
    setReviewData(JSON.parse(JSON.stringify(data)));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Favorites user={user} />
      <MyReviews reviews={reviewData?.reviews} />
    </Grid>
  );
}
