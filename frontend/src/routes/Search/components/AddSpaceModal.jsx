import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
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

import useStyles from "../styles.js";

export default function AddSpaceModal(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = () => {
    // this is where the dispatch/fetch is

    const reviewResponse = {
      puid: user?.netid,

      name,
      capacity,
      location,
      type,
    };

    // obviously this becomes a put request
    // https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples
    console.log(reviewResponse);
    handleClose();
  };

  const renderTypes = () => {
    let sorted = typesData.sort();

    return sorted.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));
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
            Add a Space
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
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
              disableElevation
              onClick={handleSubmit}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Add
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
