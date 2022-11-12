import { useState, useEffect } from "react";
import axios from "axios";

import useStyles from "../styles.js";

// import searchData from "../searchData.json";
import SpaceItem from "./SpaceItem.jsx";

import { Typography } from "@mui/material";

export default function SearchResults(props) {
  const { query } = props;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const classes = useStyles();

  const getData = () => {
    axios
      .get("/getspaces")
      .then((res) => {
        let data = res.data;
        // Setting a data from api
        setData(data.items);
        // console.log(data.items);
      })
      .catch((err) => console.log(err));
    // this is obviously temporary, will use fetch later
    // setData(JSON.parse(JSON.stringify(searchData)));
    // will also set error here using catch promise
  };

  const renderSpaces = () => {
    let filtered = data.filter(
      (space) =>
        space.name.toLowerCase().includes(query) ||
        space.location.toLowerCase().includes(query)
    );

    return (
      <>
        {filtered.map((space, index) => (
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
