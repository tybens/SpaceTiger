import { useState, useContext } from "react";

import { TextField, Button } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../../context";

import AddSpaceModal from "./AddSpaceModal.jsx";

import useStyles from "../styles.js";

export default function SearchBar(props) {
  const { query, handleChange } = props;
  const classes = useStyles();
  // const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width: "100%"}}>
    <div className={classes.searchbar}>
      <TextField
        className={classes.searchTextField}
        placeholder="Search for a space"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {/* {user && ( */}
            <Button
              variant="contained"
              disableElevation
              onClick={handleOpen}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Add a Space
            </Button>
          {/* )} */}
    </div>
    <AddSpaceModal open={open} handleClose={handleClose} />
    </div>
  );
}
