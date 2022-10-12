import "../App.css";
import Button from "@mui/material/Button";
import axios from "axios";

import NavBar from "../components/NavBar/NavBar"

export default function Landing() {
  const handleButtonClick = () => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    axios.get("/data").then((res) => {
      let data = res.data;
      // Setting a data from api
      console.log({
        name: data.Name,
        age: data.Age,
        date: data.Date,
        programming: data.programming,
      });
    });
  };
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1> Hello Cos333 World </h1>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Test Backend
        </Button>
      </header>
    </div>
  );
}
