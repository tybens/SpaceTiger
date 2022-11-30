import { useState, useEffect } from "react";

import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";

import amenitiesData from "../../../data/amenities.json";
import typesData from "../../../data/types.json";

import useStyles from "../styles.js";

typesData.unshift("Select");
amenitiesData.unshift("Select");

const TYPE = typesData;
const AMENITIES = amenitiesData;
const NOISINESS = [
  "Select",
  "Silent",
  "Soft Whisper",
  "Normal Conversation",
  "Shouting in Ear",
];
const PRIVACY = ["Select", "Private", "Semi-private", "Semi-public", "Public"];
const LIGHTING = ["Select", "", "Dim", "Normal", "Bright"];
// taken from https://spaces4learning.com/articles/2018/10/01/cleanliness.aspx
const CLEANLINESS = [
  "Select",
  "Orderly Spotlessness",
  "Ordinary Tidiness",
  "Casual Inattention",
  "Moderate Dinginess",
  "Unkempt Neglect",
];

export default function SearchFilters(props) {
  const { handleChange } = props;
  const classes = useStyles();

  const [type, setType] = useState("");
  const [noisiness, setNoisiness] = useState("");
  const [amenities, setAmenities] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [lighting, setLighting] = useState("");
  const [cleanliness, setCleanliness] = useState("");

  useEffect(() => {
    // getData();
    handleChange({
      type: type,
      noisiness: noisiness,
      amenities: amenities,
      privacy: privacy,
      lighting: lighting,
      cleanliness: cleanliness,
    });
  }, [
    type,
    noisiness,
    amenities,
    privacy,
    lighting,
    cleanliness,
    handleChange,
  ]);

  // I'm gonna make this a hamburger menu for mobile, but i don't feel like doing that right now

  return (
    <div className={classes.filters}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "160px" }}
      >
        <InputLabel id="type">Type</InputLabel>
        <Select
          displayEmpty
          labelId="type"
          id="type"
          value={type}
          label="type"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setType("");
            } else {
              setType(e.target.value);
            }
          }}
        >
          {TYPE.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "150px" }}
      >
        <InputLabel id="amenities">Amenity</InputLabel>
        <Select
          displayEmpty
          labelId="amenities"
          id="amenities"
          value={amenities}
          label="Amenity"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setAmenities("");
            } else {
              setAmenities(e.target.value);
            }
          }}
        >
          {AMENITIES.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        style={{ width: "100px" }}
        size="small"
      >
        <InputLabel id="noisiness">Noisiness</InputLabel>
        <Select
          displayEmpty
          labelId="noisiness"
          id="noisiness"
          value={noisiness}
          label="Noisiness"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setNoisiness("");
            } else {
              setNoisiness(e.target.value);
            }
          }}
        >
          {NOISINESS.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "150px" }}
      >
        <InputLabel id="privacy">Privacy</InputLabel>
        <Select
          displayEmpty
          labelId="privacy"
          id="privacy"
          value={privacy}
          label="Privacy"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setPrivacy("");
            } else {
              setPrivacy(e.target.value);
            }
          }}
        >
          {PRIVACY.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "160px" }}
      >
        <InputLabel id="lighting">Lighting</InputLabel>
        <Select
          displayEmpty
          labelId="lighting"
          id="lighting"
          value={lighting}
          label="lighting"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setLighting("");
            } else {
              setLighting(e.target.value);
            }
          }}
        >
          {LIGHTING.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "160px" }}
      >
        <InputLabel id="Cleanliness">Cleanliness</InputLabel>
        <Select
          displayEmpty
          labelId="cleanliness"
          id="cleanliness"
          value={cleanliness}
          label="cleanliness"
          onChange={(e) => {
            if (e.target.value === "Select") {
              setCleanliness("");
            } else {
              setCleanliness(e.target.value);
            }
          }}
        >
          {CLEANLINESS.map((item, idx) => (
            <MenuItem key={item + idx} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
