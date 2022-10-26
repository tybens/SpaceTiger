import { Typography } from "@mui/material";
import { Rating } from "@mui/material";

import useStyles from "../styles.js";

export default function ReviewItem(props) {
  const { review } = props;
  const classes = useStyles();

  return (
    <div className={classes.reviewItem}>
      <Rating
        className={classes.stars}
        name="read-only"
        value={review?.rating}
        precision={0.1}
        size="small"
        readOnly
        style={{ marginBottom: "10px" }}
      />
      <Typography variant="p" style={{ marginBottom: "15px" }}>
        {review?.content}
      </Typography>
      <Typography style={{ fontSize: "13px", marginTop: "auto" }}>
        Tags:{" "}
      </Typography>
    </div>
  );
}
