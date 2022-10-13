import { Button } from "@mui/material";

import useStyles from "./styles.js";

import NavBar from "../../components/NavBar";

export default function Search() {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      {/* <h1> Search Page</h1> */}
    </div>
    // <div className={classes.container}>
    //   {/* <div className={classes.fakeNavBar} /> */}
    //   <NavBar />
    //   <h1> Search Page </h1>
    // </div>
  );
}
