import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import detailData from "./details.json";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Highlights from "./components/Highlights";
import Reviews from "./components/Reviews";

import useStyles from "./styles.js";

export default function Details() {
  const [data, setData] = useState(null);
  //   const { query } = useParams();
  const classes = useStyles();

  const getData = () => {
    // fetch stuff blah blah
    setData(JSON.parse(JSON.stringify(detailData)));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Banner photos={data?.photos} />
      <Header
        name={data?.name}
        rating={data?.rating}
        numreviews={data?.numreviews}
      />

      <div className={classes.itemContainer}>
        <Highlights popularFor={data?.popularfor} tags={data?.tags} />
        <Reviews reviews={data?.reviews} />
      </div>
      {/* {query} */}
    </div>
  );
}
