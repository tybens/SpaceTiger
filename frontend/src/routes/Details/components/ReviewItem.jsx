import React, { useContext } from "react";
import { IconButton, Grid, Typography } from "@mui/material";
import { Rating } from "@mui/material";

import useStyles from "../styles.js";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import { UserContext } from "../../../context.js";

export default function ReviewItem({ review, getData }) {
  const { user } = useContext(UserContext);

  const classes = useStyles();
  const handleDelete = () => {
    axios
      .delete(`/reviews/${review.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          getData()
        } else {
          // TODO: show server error modal
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.reviewItem}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Rating
          className={classes.stars}
          name="read-only"
          value={review?.rating}
          precision={0.1}
          size="small"
          readOnly
          style={{ marginBottom: "10px" }}
        />
        {((user?.netid === review.userid) || user?.admin) && (
          <IconButton
            disableElevation
            children={<DeleteIcon />}
            onClick={handleDelete}
            color="error"
          />
        )}
      </Grid>

      <Typography variant="p" style={{ marginBottom: "auto" }}>
        {review?.content}
      </Typography>
      <Typography style={{ fontSize: "13px", margin: "15px 0" }}>
        Tags:
        {review.tags.map((item) => (
          <span key={item.id} className={classes.tag}>
            {item.tag}
          </span>
        ))}
      </Typography>

      <Typography style={{ fontSize: "13px" }}>
        Amenities:
        {review.amenities.map((item) => (
          <span key={item.id} className={classes.tag}>
            {item.amenity}
          </span>
        ))}
      </Typography>
    </div>
  );
}
