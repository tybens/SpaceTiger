import { Button, Typography } from "@material-ui/core";
import { Rating } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsIcon from "@mui/icons-material/Directions";
import CreateIcon from "@mui/icons-material/Create";

import useStyles from "../styles.js";

export default function Header(props) {
  const { name, rating, numreviews } = props;
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerFirst}>
        <Typography variant="h4">{name}</Typography>
        <div className={classes.headerBtns}>
          <Button variant="outlined" startIcon={<ReportProblemIcon />}>
            Report
          </Button>
          <Button variant="outlined" startIcon={<FavoriteIcon />}>
            Favorite
          </Button>
          <Button variant="outlined" startIcon={<DirectionsIcon />}>
            Directions
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<CreateIcon />}
            // i don't know why theming isn't working for me
            style={{ backgroundColor: "black", color: "white" }}
          >
            Write a review
          </Button>
        </div>
      </div>
      <div className={classes.headerSecond}>
        {rating}&nbsp;
        {rating && (
          <Rating
            className={classes.stars}
            name="read-only"
            value={rating}
            precision={0.1}
            size="small"
            readOnly
          />
        )}
        &nbsp;{numreviews} reviews
      </div>
    </div>
  );
}
