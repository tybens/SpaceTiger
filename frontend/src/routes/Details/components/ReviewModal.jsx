import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Rating,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../../../context.js";
import tagsData from "../../../data/tags.json";
import amenitiesData from "../../../data/amenities.json";

import useStyles from "../styles.js";

const TAGS = tagsData.reduce((acc, val) => acc.concat({"label": val}), []);
const AMENITIES = amenitiesData.reduce((acc, val) => acc.concat({"label": val}), []);

export default function ReviewModal(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { query } = useParams();
  const { user } = useContext(UserContext);

  const [status, setStatus] = useState("none");
  const [message, setMessage] = useState("");

  const [exp, setExp] = useState("");
  const [rating, setRating] = useState(0);
  const [noise, setNoise] = useState(0);
  const [light, setLight] = useState(0);
  const [prod, setProd] = useState(0);
  const [clean, setClean] = useState(0);
  const [amenity, setAmenity] = useState(0);
  const [tags, setTags] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleSubmit = () => {
    // this is where the dispatch/fetch is

    const reviewResponse = {
      rating,
      space_id: query,
      content: exp,
      // photos
      noisiness: noise,
      light,
      productivity: prod,
      cleanliness: clean,
      amenities_rating: amenity,
      tags,
      amenities,
      puid: user.netid,
    };


    if (user) {
      axios
        .post("/reviews", reviewResponse)
        .then((res) => {
          if (res.status === 200) {
            setStatus("success");
            setMessage(
              "Success! After an administrator approves your space, you will be able to search and review it. "
            );
            // navigate("/profile");
          } else {
            // TODO: show server error modal
            console.log(res);
            setStatus("error");
            setMessage("Adding the space failed. Please try again later. ");
          }
        })
        .catch((err) => {
          console.log(err);
          setStatus("error");
          setMessage(
            "An error occured with our systems. Please try again later."
          );
          console.log(status);
          console.log(message);
        });
    } else {
      // TODO: show modal that user must login before performing
      // such an actions
      console.log("user unauthenticated, can't create a space");
      setStatus("error");
      setMessage("User unauthenticated, can't create a space!");
    }
    console.log(reviewResponse);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal"
      aria-describedby="review"
    >
      <Box className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Write a Review
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.modalForm}>
          <Typography style={{ marginBottom: "20px" }}>
            Your name will not publically appear with your review.
          </Typography>
          <Typography variant="h6">Overall Rating</Typography>
          <Rating
            className={classes.stars}
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
            style={{ marginBottom: "20px" }}
          />

          <Typography variant="h6">Rate Features</Typography>

          <div className={classes.featureContainer}>
            <div className={classes.featureItem}>
              <Typography variant="p">Cleanliness</Typography>
              <Rating
                className={classes.stars}
                name="clean"
                value={clean}
                onChange={(event, newValue) => {
                  setClean(newValue);
                }}
              />
            </div>
            <div className={classes.featureItem}>
              <Typography variant="p">Noisiness</Typography>
              <Rating
                className={classes.stars}
                name="noise"
                value={noise}
                onChange={(event, newValue) => {
                  setNoise(newValue);
                }}
              />
            </div>
            <div className={classes.featureItem}>
              <Typography variant="p">Lighting</Typography>
              <Rating
                className={classes.stars}
                name="light"
                value={light}
                onChange={(event, newValue) => {
                  setLight(newValue);
                }}
              />
            </div>
            <div className={classes.featureItem}>
              <Typography variant="p">Productivity</Typography>
              <Rating
                className={classes.stars}
                name="prod"
                value={prod}
                onChange={(event, newValue) => {
                  setProd(newValue);
                }}
              />
            </div>
            <div className={classes.featureItem}>
              <Typography variant="p">Amenities</Typography>
              <Rating
                className={classes.stars}
                name="amenities"
                value={amenity}
                onChange={(event, newValue) => {
                  setAmenity(newValue);
                }}
              />
            </div>
          </div>

          {/* skipping image upload until we have backend :) */}

          <Typography variant="h6">Tell us about your experience</Typography>
          <TextField
            id="outlined-exp"
            label="Experience"
            placeholder="What did you like or dislike?"
            value={exp}
            multiline
            onChange={(e) => {
              setExp(e.target.value);
            }}
            style={{ width: "100%", marginBottom: "20px" }}
            rows={3}
          />

          <Typography variant="h6">Add tags</Typography>
          <Autocomplete
            style={{ marginBottom: "20px" }}
            multiple
            id="amenities-standard"
            options={TAGS}
            value={tags}
            onChange={(event, newValue) => {
              setTags(newValue.map((option) => option.label || option));
            }}
            isOptionEqualToValue={(option, value) => option.label === value}
            // getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select a tag to add"
              />
            )}
          />

          <Typography variant="h6">Add amenities</Typography>
          <Autocomplete
            style={{ marginBottom: "30px" }}
            multiple
            id="amenities-standard"
            options={AMENITIES}
            value={amenities}
            onChange={(event, newValue) => {
              setAmenities(newValue.map((option) => option.label || option));
            }}
            isOptionEqualToValue={(option, value) => option.label === value}
            // getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select an amenity to add"
              />
            )}
          />

          <div
            className={classes.headerBtns}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableelevationevation
              onClick={handleSubmit}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Post
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
