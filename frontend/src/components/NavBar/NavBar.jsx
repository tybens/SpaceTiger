import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";

import useStyles from "./styles";


const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar disableGutters={true}>
        <div className={classes.titleDiv}>
          <Link to="/" className={classes.image}>
            <img
              height="100%"
              src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-UlsHgisSWi0%2FVPjfkJJmFEI%2FAAAAAAAADS4%2Fy78jhsvjpzo%2Fs1600%2FScreen%252BShot%252B2015-03-05%252Bat%252B2.55.30%252BPM.png&f=1&nofb=1&ipt=9f520660197719a49ca5c790c74ca8876c79fc0d27266815a8b121966e91a081&ipo=images"}
              alt="SpaceTiger NavBar"
            />
          </Link>
        </div>
        {/* TODO: add logic for if logged in or not */}
        <nav>
          <NavLink strict exact to={"/login"} style={{ zIndex: 2 }}>
            Login
          </NavLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
