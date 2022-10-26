import { Typography } from "@mui/material";

import ReviewItem from "./ReviewItem.jsx";

import useStyles from "../styles.js";

export default function Reviews(props) {
  const { reviews } = props;
  const classes = useStyles();

  const createItems = () => {
    if (reviews?.length === 0) {
      return <p>No reviews.</p>;
    }
    return reviews?.map((r) => {
      return <ReviewItem review={r} />;
    });
  };

  return (
    <div className={classes.reviewsContainer}>
      <Typography variant="h5">Reviews ({reviews?.length})</Typography>
      <div className={classes.reviewGrid}>{createItems()}</div>
    </div>
  );
}
