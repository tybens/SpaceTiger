import { useState } from "react";

import SearchResults from "./components/SearchResults.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SearchFilters from "./components/SearchFilters";

import useStyles from "./styles.js";

export default function Search() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    type: [],
    noisiness: [],
    amenities: [],
    privacy: [],
    lighting: [],
    cleanliness: [],
  });
  const [sort, setSort] = useState("");
  const classes = useStyles();

  const updateQuery = (q) => {
    setQuery(q);
  };

  return (
    <div className={classes.container}>
      <SearchBar query={query} handleChange={updateQuery} />
      <SearchFilters filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
      <SearchResults filters={filters} query={query} sort={sort} />
    </div>
  );
}
