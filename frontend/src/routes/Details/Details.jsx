import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import detailData from "./details.json";
import Banner from "./components/Banner";
import Header from "./components/Header";
// import Highlights from "./components/Highlights";
import Reviews from "./components/Reviews";
import Amenities from "./components/Amenities";

import useStyles from "./styles.js";

export default function Details() {
  const [data, setData] = useState(null);
  const [position, setPosition] = useState([46.48826, -63.65346]);
  const { query } = useParams();
  const classes = useStyles();

  const getData = useCallback(() => {
    axios
      .get(`/spaces/${query}`)
      .then((res) => {
        let data = res.data;
        // Setting a data from api
        // setData(data.items);
        // console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
    // fetch stuff blah blah
    // setData(JSON.parse(JSON.stringify(detailData)));
  }, [query]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Banner photos={data?.photos} />
      <Header
        name={data?.space.name}
        rating={data?.space.rating}
        numreviews={data?.space.numreviews}
        space_id={query}
      />

      <div className={classes.itemContainer}>
        <Amenities
          amenities={data?.amenities}
          position={position}
          label={data?.space.location}
        />
        {/* <Highlights popularFor={data?.popularfor} tags={data?.tags} /> */}
        <Reviews reviews={data?.reviews} />
      </div>
      {/* {query} */}
    </div>
  );
}
