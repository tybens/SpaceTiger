import { useState } from "react";

import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";

import useStyles from "../styles.js";

// okay this is just me defining categories. feel free to change
// ideally i should be able to fetch this from the backend
const POPULAR_FOR = [
  "",
  "studying",
  "group work",
  "social events",
  "hanging out",
  "rehearsals",
];
const NOISE = ["", "quiet", "loud"];
const PRIVACY = ["", "low", "medium", "high"];
const LIGHTING = ["", "low", "medium", "high"];
const SEATING = ["", "chairs", "couches"];
const TYPE = ["", "nook", "room", "classroom", "rehearsal", "outdoors"];

export default function SearchFilters(props) {
  const classes = useStyles();

  const [noise, setNoise] = useState("");
  const [popfor, setPopFor] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [lighting, setLighting] = useState("");
  const [seating, setSeating] = useState("");
  const [type, setType] = useState("");

  // I'm gonna make this a hamburger menu for mobile, but i don't feel like doing that right now

  return (
    <div className={classes.filters}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        style={{ width: "150px" }}
      >
        <InputLabel id="popfor">Popular for</InputLabel>
        <Select
          displayEmpty
          labelId="popfor"
          id="popfor"
          value={popfor}
          label="Popular for"
          onChange={(e) => setPopFor(e.target.value)}
        >
          {POPULAR_FOR.map((item) => (
            <MenuItem key={item} value={item}>
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
        <InputLabel id="noise">Noise</InputLabel>
        <Select
          displayEmpty
          labelId="noise"
          id="noise"
          value={noise}
          label="Noise"
          onChange={(e) => setNoise(e.target.value)}
        >
          {NOISE.map((item) => (
            <MenuItem key={item} value={item}>
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
          onChange={(e) => setPrivacy(e.target.value)}
        >
          {PRIVACY.map((item) => (
            <MenuItem key={item} value={item}>
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
        <InputLabel id="lighting">Natural Light</InputLabel>
        <Select
          displayEmpty
          labelId="lighting"
          id="lighting"
          value={lighting}
          label="lighting"
          onChange={(e) => setLighting(e.target.value)}
        >
          {LIGHTING.map((item) => (
            <MenuItem key={item} value={item}>
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
        <InputLabel id="seating">Seating</InputLabel>
        <Select
          displayEmpty
          labelId="seating"
          id="seating"
          value={seating}
          label="seating"
          onChange={(e) => setSeating(e.target.value)}
        >
          {SEATING.map((item) => (
            <MenuItem key={item} value={item}>
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
        <InputLabel id="type">Type</InputLabel>
        <Select
          displayEmpty
          labelId="type"
          id="type"
          value={type}
          label="type"
          onChange={(e) => setType(e.target.value)}
        >
          {TYPE.map((item) => (
            <MenuItem key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
