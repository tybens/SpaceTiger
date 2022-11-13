import { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsIcon from "@mui/icons-material/Directions";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

import ReviewModal from "./ReviewModal.jsx";

import useStyles from "../styles.js";
import { UserContext } from "../../../context";

export default function Header({ name, rating, numreviews, space_id }) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFavorite = () => {
    if (user) {
      axios
        .get("/postfavorite", {
          params: { user_id: user?.netid, space_id: space_id },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            setFavorite((favorite) => !favorite);
          } else {
            // TODO: show server error modal
            console.log(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // TODO: show modal that user must login before performing
      // such an actions
      console.log("user unauthenticated, can't favorite");
    }
  };

  const getFavorite = () => {
    if (user) {
      axios
        .get("/getfavorite", {
          params: { user_id: user?.netid, space_id: space_id },
        })
        .then((res) => {
          let data = res.data;
          setFavorite(data.is_favorite);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerFirst}>
        <Typography variant="h4">{name}</Typography>
        <div className={classes.headerBtns}>
          <Button variant="outlined" startIcon={<ReportProblemIcon />}>
            Report
          </Button>
          <Button
            variant="outlined"
            startIcon={<FavoriteIcon />}
            color={favorite ? "error" : "inherit"}
            onClick={handleFavorite}
          >
            {favorite ? "Un-Favorite" : "Favorite"}
          </Button>
          <Button variant="outlined" startIcon={<DirectionsIcon />}>
            Directions
          </Button>
          {user && (
            <Button
              variant="contained"
              disableElevation
              startIcon={<CreateIcon />}
              onClick={handleOpen}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Write a review
            </Button>
          )}
        </div>
      </div>
      <div className={classes.headerSecond}>
        {rating !== 0 && (
          <>
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
          </>
        )}
        {rating === 0 && <>Not yet rated.</>}
      </div>
      <ReviewModal open={open} handleClose={handleClose} />
    </div>
  );
}
