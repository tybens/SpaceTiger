import { useState, useEffect } from "react";
import axios from "axios";

import useStyles from "../styles.js";

import SpaceItem from "../../../components/SpaceItem";
import { Loader } from "../../../components/Loader.jsx";

import { Typography, Button } from "@mui/material";

const NUM_SHOWN = 20;

export default function SearchResults(props) {
  const { query } = props;
  const [received, setReceived] = useState(false);
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  // const [amenities, setAmenities] = useState([]);
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
        setData(data.spaces);
        setPhotos(data.photos);
        // setAmenities(data.amenities);
        setReceived(true);
      })
      .catch((err) => setError(true));
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
    if (filtered.length === 0) return <p>No spaces match this query.</p>;
    return (
      <>
        {filtered?.slice(0, next)?.map((space, index) => (
          <SpaceItem
            key={index}
            space={space}
            photo={photos.find((item) => item.spaceid === space.id)}
          />
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
      {error && <p>An error occured with our systems. Check back later!</p>}
      {!error && !received && <Loader />}
      {!error && received && (
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
      )}
    </>
  );
}
