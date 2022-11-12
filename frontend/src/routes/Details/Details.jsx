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
  const { query } = useParams();
  const classes = useStyles();

  const getData = useCallback(() => {
    axios
      .get("/getspacedetails", { params: { id: query } })
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
      />

      <div className={classes.itemContainer}>
        <Amenities amenities={data?.amenities} />
        {/* <Highlights popularFor={data?.popularfor} tags={data?.tags} /> */}
        <Reviews reviews={data?.reviews} />
      </div>
      {/* {query} */}
    </div>
  );
}
