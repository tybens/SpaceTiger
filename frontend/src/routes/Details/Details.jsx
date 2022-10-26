import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import detailData from "./details.json";
import Banner from "./components/Banner";

export default function Details() {
  const [data, setData] = useState(null);
  const { query } = useParams();

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
      {query}
    </div>
  );
}
