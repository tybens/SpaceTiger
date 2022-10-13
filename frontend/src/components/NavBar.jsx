import React, { useContext } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, NavLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { UserContext } from "../context";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "2px solid black",
    [theme.breakpoints.up("xs")]: {
      padding: "15px 30px",
    },
  },

  title: {
    letterSpacing: "-0.03em",
    fontWeight: "bold !important",
  },

  logo: {
    textDecoration: "none",
  },

  fakeNavBar: {
    height: 100,
  },

  navLink: {
    textDecoration: "none",
  },
}));

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const handleLogin = () => {
    setUser(true);
  };

  return (
    <>
      <div className={classes.fakeNavBar} />
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar disableGutters={true}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link to="/" className={classes.logo}>
                <Typography
                  className={classes.title}
                  variant="h4"
                  color="initial"
                >
                  SpaceTiger
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              {!user ? (
                <Button
                  onClick={handleLogin}
                  className={classes.navLink}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              ) : (
                <NavLink
                  className={classes.navLink}
                  strict="true"
                  to={"/profile"}
                >
                  <Grid container direction="row" alignItems="center">
                    <Typography variant="h6" color="initial">
                      netid
                    </Typography>
                    <ArrowDropDownIcon color="primary" />
                  </Grid>
                </NavLink>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
