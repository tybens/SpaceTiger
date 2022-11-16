import { useState, useEffect } from "react";
import axios from "axios";

import useStyles from "../styles.js";

import SpaceItem from "./SpaceItem.jsx";

import { Typography, Button } from "@mui/material";

const NUM_SHOWN = 20;

export default function SearchResults(props) {
  const { query } = props;
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(NUM_SHOWN);

  const classes = useStyles();

  const handleMoreImage = () => {
    setNext(next + NUM_SHOWN);
  };

  const getData = () => {
    axios
      .get("/getspaces")
      .then((res) => {
        let data = res.data;
        // Setting a data from api
        setData(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNext(NUM_SHOWN);
    setFiltered(
      data.filter(
        (space) =>
          space.name.toLowerCase().includes(query.toLowerCase()) ||
          space.location.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [data, query]);

  const renderSpaces = () => {
    return (
      <>
        {filtered?.slice(0, next)?.map((space, index) => (
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
    <>
      <div className={classes.spaceContainer}>
        {error && (
          <Typography variant="p">Sorry, an error occured. </Typography>
        )}
        {renderSpaces()}
      </div>
      {next < filtered?.length && (
        <Button className="mt-4" onClick={handleMoreImage}>
          Load more
        </Button>
      )}
    </>
  );
}
