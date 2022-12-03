import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import typesData from "../../../data/types.json";
import locationsData from "../../../data/locations.json";

import { UserContext } from "../../../context.js";
import UploadAndDisplayImage from "./UploadPhoto";

import useStyles from "../styles.js";

export default function AddSpaceModal(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("none");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);

  const onClose = () => {
    setStatus("none");
    setMessage("");
    handleClose();
  };

  const handleSubmit = () => {
    // this is where the dispatch/fetch is
    const dataImages = images.map((i) => i.data);

    const reviewResponse = {
      puid: user?.netid,
      name,
      capacity,
      location,
      type,
      images: dataImages,
    };

    console.log("post: ", reviewResponse);
    // obviously this becomes a put request
    // https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples

    if (user) {
      axios
        .post("/spaces", reviewResponse)
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
        });
    } else {
      // TODO: show modal that user must login before performing
      // such an actions
      console.log("user unauthenticated, can't create a space");
      setStatus("error");
      setMessage("User unauthenticated, can't create a space!");
    }
  };

  const renderPostMessage = () => {
    return (
      <div className={classes.modalForm}>
        <Typography variant="p">{message}</Typography>
        <div
          className={classes.headerBtns}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {status === "error" && (
            <Button
              variant="contained"
              disableelevationevation
              onClick={onClose}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Close
            </Button>
          )}
          {status === "success" && (
            <Button
              variant="contained"
              disableelevationevation
              onClick={() => navigate("/profile")}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderTypes = () => {
    let sorted = [...typesData].sort();

    return sorted.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));
  };

  const renderForm = () => {
    return (
      <div className={classes.modalForm}>
        <Typography style={{ marginBottom: "20px" }}>
          Tell us the basics.
        </Typography>
        <Typography variant="h6">Name</Typography>
        <TextField
          id="outlined-name"
          label="Name"
          placeholder="What do people call this space?"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ width: "60%", marginBottom: "20px" }}
        />

        <Typography variant="h6">Capacity</Typography>
        <TextField
          id="outlined-capacity"
          label="Capacity"
          placeholder="About how many people would fit?"
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
          style={{ width: "60%", marginBottom: "20px" }}
          type="number"
        />

        <Typography variant="h6">Type</Typography>
        <FormControl className={classes.selectForm}>
          <InputLabel htmlFor="type-select">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            style={{ width: "60%", marginBottom: "20px" }}
          >
            {renderTypes()}
          </Select>
        </FormControl>

        <Typography variant="h6">Location</Typography>
        <Autocomplete
          freeSolo
          id="location"
          options={locationsData.map((option) => option.name)}
          value={location}
          onChange={(_, newValue) => {
            setLocation(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          inputValue={locationInput}
          onInputChange={(_, newInputValue) => {
            setLocationInput(newInputValue);
          }}
          style={{ width: "60%", marginBottom: "20px" }}
        />

        <Typography variant="h6">Upload Photo</Typography>
        <UploadAndDisplayImage
          setImages={setImages}
          images={images}
          style={{ width: "60%", marginBottom: "20px" }}
        />

        <div
          className={classes.headerBtns}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disableelevationevation
            onClick={handleSubmit}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="review-modal"
      aria-describedby="review"
    >
      <Box className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Add a Space
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {status === "none" && renderForm()}
        {status !== "none" && renderPostMessage()}
      </Box>
    </Modal>
  );
}
