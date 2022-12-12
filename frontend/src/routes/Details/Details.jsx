import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import locationData from "../../data/locations.json";
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
  const [loaded, setLoaded] = useState(false);
  const { query } = useParams();
  const classes = useStyles();

  const getData = useCallback(() => {
    axios
      .get(`/spaces/${query}`)
      .then((res) => {
        let data = res.data;

        let locations = JSON.parse(JSON.stringify(locationData));

        let temp = locations.find((item) => item.name === data?.space.location);

        if (temp) {
          setPosition(temp.position);
        }

        setLoaded(true);
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
        numreviews={data?.reviews.length}
        location={data?.space.location}
        getData={getData}
        space_id={query}
      />

      <div className={classes.itemContainer}>
        {loaded && (
          <Amenities
            space={data.space}
            amenities={data?.amenities}
            position={position}
            label={data?.space.location}
          />
        )}
        {/* <Highlights popularFor={data?.popularfor} tags={data?.tags} /> */}
        <Reviews getData={getData} reviews={data?.reviews} />
      </div>
      {/* {query} */}
    </div>
  );
}
