import { FormControl, MenuItem, InputLabel, Select, Checkbox } from "@mui/material";

import amenitiesData from "../../../data/amenities.json";
import typesData from "../../../data/types.json";

import useStyles from "../styles.js";

const TYPE = typesData;
const AMENITIES = amenitiesData;
const NOISINESS = [
  "Silent",
  "Soft Whisper",
  "Normal Conversation",
  "Shouting in Ear",
];
const PRIVACY = ["Private", "Semi-private", "Semi-public", "Public"];
const LIGHTING = ["Dim", "Normal", "Bright"];
// taken from https://spaces4learning.com/articles/2018/10/01/cleanliness.aspx
const CLEANLINESS = [
  "Orderly Spotlessness",
  "Ordinary Tidiness",
  "Casual Inattention",
  "Moderate Dinginess",
  "Unkempt Neglect",
];
const SORT = [
  "Select",
  "Name A-Z",
  "Name Z-A",
  "Avg. Rating",
]

export default function SearchFilters({ filters, setFilters, sort, setSort }) {
  const classes = useStyles();

  const handleUpdateFilter = (filterId, newFilter) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: newFilter,
    }));
  };

  // I'm gonna make this a hamburger menu for mobile, but i don't feel like doing that right now

  return (
    <div className={classes.filtersContainer}>
      <div className={classes.filters}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          style={{ width: "160px" }}
        >
          <InputLabel id="type">Type</InputLabel>
          <Select
            multiple
            labelId="type"
            id="type"
            value={filters.type}
            label="type"
            onChange={(e) => handleUpdateFilter("type", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {TYPE.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.type.indexOf(item) > -1} />
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
          <InputLabel id="amenities">Amenities</InputLabel>
          <Select
            multiple
            labelId="amenities"
            id="amenities"
            value={filters.amenities}
            label="Amenities"
            onChange={(e) => handleUpdateFilter("amenities", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {AMENITIES.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.amenities.indexOf(item) > -1} />
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
            multiple
            labelId="noisiness"
            id="noisiness"
            value={filters.noisiness}
            label="Noisiness"
            onChange={(e) => handleUpdateFilter("noisiness", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {NOISINESS.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.noisiness.indexOf(item) > -1} />
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
            multiple
            labelId="privacy"
            id="privacy"
            value={filters.privacy}
            label="Privacy"
            onChange={(e) => handleUpdateFilter("privacy", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {PRIVACY.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.privacy.indexOf(item) > -1} />
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
            multiple
            labelId="lighting"
            id="lighting"
            value={filters.lighting}
            label="lighting"
            onChange={(e) => handleUpdateFilter("lighting", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {LIGHTING.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.lighting.indexOf(item) > -1} />
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
          <InputLabel id="cleanliness">Cleanliness</InputLabel>
          <Select
            multiple
            labelId="cleanliness"
            id="cleanliness"
            value={filters.cleanliness}
            label="cleanliness"
            onChange={(e) => handleUpdateFilter("cleanliness", e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {CLEANLINESS.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                <Checkbox checked={filters.cleanliness.indexOf(item) > -1} />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.sort}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          style={{ width: "160px" }}
        >
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            labelId="sort"
            id="sort"
            value={sort}
            label="sort"
            onChange={(e) => {
              if (e.target.value === "Select") {
                setSort("");
              } else {
                setSort(e.target.value);
              }
            }}
          >
            {SORT.map((item, idx) => (
              <MenuItem key={item + idx} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
