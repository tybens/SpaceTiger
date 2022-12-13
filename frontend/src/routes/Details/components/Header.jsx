import { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Rating } from "@mui/material";
// import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsIcon from "@mui/icons-material/Directions";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import ReviewModal from "./ReviewModal.jsx";

import useStyles from "../styles.js";
import { UserContext } from "../../../context";

export default function Header({
  name,
  rating,
  numreviews,
  space_id,
  getData,
  location,
}) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    location + " Princeton NJ"
  )}`;
  if (location?.toLowerCase().includes("outdoor")) {
    directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      name + " Princeton NJ"
    )}`;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (user?.admin) {
      axios
        .delete(`/spaces/${space_id}`)
        .then((res) => {
          if (res.status === 200) {
            navigate(-1);
          } else {
            // TODO: show server error modal
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    }
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
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData, open]);

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerFirst}>
        <Typography variant="h4">{name}</Typography>
        <div className={classes.headerBtns}>
          {/* {user && (
            <Button variant="outlined" startIcon={<ReportProblemIcon />}>
              Report
            </Button>
          )} */}
          {user && (
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              color={favorite ? "error" : "inherit"}
              onClick={handleFavorite}
            >
              {favorite ? "Un-Favorite" : "Favorite"}
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<DirectionsIcon />}
            href={directionsURL}
            // style={{ marginRight: "10px" }}
          >
            Directions
          </Button>
          {user && (
            <Button
              variant="contained"
              disableelevation="true"
              startIcon={<CreateIcon />}
              onClick={handleOpen}
              style={{
                backgroundColor: "black",
                color: "white",
                // marginRight: "10px",
              }}
            >
              Write a review
            </Button>
          )}
          {user?.admin && (
            <Button
              variant="contained"
              disableelevation="true"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              color="error"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      <div className={classes.headerSecond}>
        {rating && rating !== 0 ? (
          <>
            {Math.round(rating * 100) / 100}&nbsp;
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
        ) : (
          <>Not yet rated.</>
        )}
      </div>
      <ReviewModal open={open} handleClose={handleClose} />
    </div>
  );
}
