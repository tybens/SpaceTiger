import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import NavBar from "../components/NavBar";


const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
}));


export default function Landing() {
  const classes = useStyles();

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
    <div className={classes.container}>
      <NavBar />
      <h1> Hello Cos333 World </h1>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Test Backend
      </Button>
    </div>
  );
}
