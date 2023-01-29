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
import { Loader } from "../../components/Loader";

import useStyles from "./styles.js";

export default function Details() {
  const [data, setData] = useState(null);
  const [position, setPosition] = useState([46.48826, -63.65346]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { query } = useParams();
  const classes = useStyles();
  // console.log(loaded);

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
      .catch((err) => {
        setLoaded(true);
        setError(true);
        console.log(err);
      });
    // fetch stuff blah blah
    // setData(JSON.parse(JSON.stringify(detailData)));
  }, [query]);

  const detailsPage = () => {
    return (
      <>
        <Banner photos={data?.photos} />

        <Header
          name={data?.space.name}
          rating={data?.space.rating}
          numreviews={data?.reviews.length}
          location={data?.space.location}
          puid={data?.space.userid}
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
      </>
    );
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {!loaded && (
        <>
          <div style={{ height: "30px" }} />
          <Loader />
        </>
      )}
      {loaded && error && (
        <p style={{ marginLeft: "10px" }}>
          An error occured with our systems. Check back later!
        </p>
      )}
      {loaded && !error && detailsPage()}
    </div>
  );
}
