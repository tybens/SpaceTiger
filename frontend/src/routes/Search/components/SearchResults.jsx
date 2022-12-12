import { useState, useEffect } from "react";
import axios from "axios";

import useStyles from "../styles.js";

import SpaceItem from "../../../components/SpaceItem";
import { Loader } from "../../../components/Loader.jsx";
import {
  matchNoisiness,
  matchPrivacy,
  matchLighting,
  matchCleanliness,
  sortResults,
} from "../utils.js";

import { Typography, Button } from "@mui/material";

const NUM_SHOWN = 20;

export default function SearchResults(props) {
  const { query, filters, sort } = props;
  const [received, setReceived] = useState(false);
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(NUM_SHOWN);

  const classes = useStyles();

  const handleMoreImage = () => {
    setNext(next + NUM_SHOWN);
  };

  const getData = () => {
    axios
      .get("/spaces")
      .then((res) => {
        let data = res.data;
        setData(data.spaces);
        setPhotos(data.photos);
        setReceived(true);
      })
      .catch((err) => setError(true));
  };

  useEffect(() => {
    setNext(NUM_SHOWN);
    let filteredData = data.filter((space) => {
      const matchesQuery =
        space.name.toLowerCase().includes(query.toLowerCase()) ||
        space.location.toLowerCase().includes(query.toLowerCase());

      const matchesType =
        filters.type.length > 0
          ? filters.type.filter((value) => space.type === value).length > 0
          : true;
      const matchesAmenities =
        filters.amenities.length > 0
          ? filters.amenities.filter((value) => space.amenities.includes(value))
              .length === filters.amenities.length
          : true;
      const matchesNoisiness =
        filters.noisiness.length > 0
          ? filters.noisiness.filter((value) =>
              matchNoisiness(value, space.noisiness)
            ).length > 0
          : true;
      const matchesPrivacy =
        filters.privacy.length > 0
          ? filters.privacy.filter((value) =>
              matchPrivacy(value, space.privacy)
            ).length > 0
          : true;
      const matchesLighting =
        filters.lighting.length > 0
          ? filters.lighting.filter((value) =>
              matchLighting(value, space.lighting)
            ).length > 0
          : true;
      const matchesCleanliness =
        filters.cleanliness.length > 0
          ? filters.cleanliness.filter((value) =>
              matchCleanliness(value, space.cleanliness)
            ).length > 0
          : true;

      const matchesFilters =
        matchesType &&
        matchesAmenities &&
        matchesNoisiness &&
        matchesPrivacy &&
        matchesLighting &&
        matchesCleanliness;

      return matchesQuery && matchesFilters;
    });
    filteredData = sortResults(filteredData, sort);
    setFiltered(filteredData);
  }, [data, query, filters, sort]);

  const renderSpaces = () => {
    console.log(filtered);
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
