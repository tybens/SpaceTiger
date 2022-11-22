import { useState } from "react";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";

import ReviewItem from "../../Details/components/ReviewItem.jsx";

const useStyles = makeStyles((theme) => ({
  block: {
    padding: "30px",
  },
}));

export default function MyReviews({ reviews }) {
  const classes = useStyles();
  const [numReviews, setNumReviews] = useState(3);

  const ReviewItems = () => {
    if (reviews?.length === 0) {
      return <p>No reviews.</p>;
    }
    return reviews?.slice(0, numReviews).map((r, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ReviewItem key={index} review={r} />
        </Grid>
      );
    });
  };

  const handleViewMore = () => {
    if (numReviews + 4 > reviews?.length) {
      setNumReviews(reviews?.length);
    } else {
      setNumReviews(numReviews + 4);
    }
  };

  return (
    <Grid item container className={classes.block} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Your Reviews ({reviews?.length})</Typography>
      </Grid>
      <ReviewItems />
      {numReviews < reviews?.length && (
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleViewMore}
            fullWidth
          >
            <IconButton aria-label="load more">
              <AddIcon />
            </IconButton>
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
