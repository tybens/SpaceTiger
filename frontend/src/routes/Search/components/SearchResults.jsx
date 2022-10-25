import { useState, useEffect } from "react";

import useStyles from "../styles.js";

import searchData from "../searchData.json";
import SpaceItem from "./SpaceItem.jsx";

import { Typography } from "@material-ui/core";

export default function SearchResults() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const classes = useStyles();

  const getData = () => {
    // this is obviously temporary, will use fetch later
    setData(JSON.parse(JSON.stringify(searchData)));
    // will also set error here using catch promise
  };

  const renderSpaces = () => {
    return (
      <>
        {data.map((space, index) => (
          <SpaceItem key={index} space={space} />
        ))}
      </>
    );
  };

  useEffect(() => {
    getData();
    setError(false);
  }, []);

  return (
    <div className={classes.spaceContainer}>
      {error && <Typography variant="p">Sorry, an error occured. </Typography>}
      {renderSpaces()}
    </div>
  );
}
