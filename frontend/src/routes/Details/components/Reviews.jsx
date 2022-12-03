import { Typography } from "@mui/material";

import ReviewItem from "./ReviewItem.jsx";

import useStyles from "../styles.js";

export default function Reviews({ reviews, getData }) {
  const classes = useStyles();

  const createItems = () => {
    if (reviews?.length === 0) {
      return <p>No reviews.</p>;
    }
    return reviews?.map((r, index) => {
      return <ReviewItem key={index} getData={getData} review={r} />;
    });
  };

  return (
    <div className={classes.reviewsContainer}>
      <Typography variant="h5">Reviews ({reviews?.length})</Typography>
      <div className={classes.reviewGrid}>{createItems()}</div>
    </div>
  );
}
