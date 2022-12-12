import { useState, useEffect } from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import ReviewItem from "../../Details/components/ReviewItem.jsx";

const useStyles = makeStyles((theme) => ({
  block: {
    padding: "30px",
  },
}));

export default function MyReviews({ user }) {
  const classes = useStyles();
  const [numReviews, setNumReviews] = useState(3);
  const [reviewData, setReviewData] = useState(null);

  const getData = () => {
    axios
      .get("/reviews", {
        params: { user_id: user?.netid },
      })
      .then((res) => {
        let data = res.data;
        setReviewData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const ReviewItems = () => {
    if (reviewData?.length === 0) {
      return (
        <Grid item>
          <Typography variant="body1" color="initial">
            You don't have any reviews! Try <Link component={RouterLink} to={"/search"}>reviewing a space</Link>.
          </Typography>
        </Grid>
      );
    }
    return reviewData?.slice(0, numReviews).map((r, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ReviewItem key={index} review={r} />
        </Grid>
      );
    });
  };

  const handleViewMore = () => {
    if (numReviews + 4 > reviewData?.length) {
      setNumReviews(reviewData?.length);
    } else {
      setNumReviews(numReviews + 4);
    }
  };

  return (
    <Grid item container className={classes.block} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Your Reviews ({reviewData?.length})
        </Typography>
      </Grid>
      <ReviewItems />
      {numReviews < reviewData?.length && (
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleViewMore}
            fullWidth
          >
            {/* <IconButton aria-label="load more"> */}
            <AddIcon />
            {/* </IconButton> */}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
