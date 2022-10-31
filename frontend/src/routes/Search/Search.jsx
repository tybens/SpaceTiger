import { useState } from "react";

import SearchResults from "./components/SearchResults.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SearchFilters from "./components/SearchFilters";

import useStyles from "./styles.js";

export default function Search() {
  const [query, setQuery] = useState("");
  const classes = useStyles();

  const updateQuery = (q) => {
    setQuery(q);
  };

  return (
    <div className={classes.container}>
      <SearchBar query={query} handleChange={updateQuery} />
      <SearchFilters />
      <SearchResults />
    </div>
  );
}
