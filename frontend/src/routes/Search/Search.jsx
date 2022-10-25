import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import useStyles from "./styles.js";

import NavBar from "../../components/NavBar";
import SearchResults from "./components/SearchResults.jsx";

export default function Search() {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <SearchResults />
    </div>
  );
}
