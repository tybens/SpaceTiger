import { useState, useEffect } from "react";

import { TextField } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import useStyles from "../styles.js";

export default function SearchBar(props) {
  const { query, handleChange } = props;
  const classes = useStyles();

  return (
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
    </div>
  );
}
