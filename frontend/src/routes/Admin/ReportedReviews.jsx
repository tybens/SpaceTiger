import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
// import { Link } from "react-router-dom";
import ReviewItem from "../Details/components/ReviewItem";
import { UserContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  block: {
    padding: "30px",
  },
}));

const ApprovalDissaproval = ({ handleClick, reviewId }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="flex-end"
      justifyContent="space-between"
      style={{ marginTop: "8px" }}
    >
      <Grid item>
        <LoadingButton
          startIcon={<DoneIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(true, reviewId);
          }}
          loading={loading}
          variant="outlined"
          color="secondary"
        >
          Keep
        </LoadingButton>
      </Grid>
      <Grid item>
        <LoadingButton
          startIcon={<CloseIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(false, reviewId);
          }}
          loading={loading}
          variant="outlined"
          color="error"
        >
          Delete Review
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default function ReportedReviews() {
  const classes = useStyles();
  const [numReviews, setNumReviews] = useState(3);
  const [reviewData, setReviewData] = useState(null);
  const [reportsData, setReportsData] = useState(null)
  const { user } = useContext(UserContext);

  const handleReport = (keep, reviewId) => {
    console.log("keep", keep);
    console.log("reviewid", reviewId);

    // TODO: backend handle approval
    // axios
    //   .get("/approve", {
    //     params: { user_id: user?.netid, space_id: spaceId, approval: approval },
    //   })
    //   .then((res) => {
    //     //   let data = res.data;
    //     console.log("Success!");
    //     getData();
    //   })
    //   .catch((err) => {
    //     setError(true);
    //     console.log(error);
    //   });
  };
  

  const getReports = () => {
    axios
      .get("/reports")
      .then((res) => {
        let data = res.data;
        console.log(data)
        setReportsData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, []);

  const ReviewItems = () => {
    if (reviewData?.length === 0) {
      return (
        <Grid item>
          <Typography variant="body1" color="initial">
            No reviews have been reported at this time.
          </Typography>
        </Grid>
      );
    }
    return reviewData?.slice(0, numReviews).map((r, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ReviewItem reported key={index} review={r} />
          <ApprovalDissaproval reviewId={r.id} handleClick={handleReport} />
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
        <Typography variant="h4">Reported Reviews</Typography>
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
