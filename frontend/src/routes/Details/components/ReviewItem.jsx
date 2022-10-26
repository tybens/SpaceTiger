import { Typography } from "@mui/material";

import useStyles from "../styles.js";

export default function ReviewItem(props) {
  const { review } = props;
  const classes = useStyles();

  return <div className={classes.reviewItem}>{review?.content}</div>;
}
