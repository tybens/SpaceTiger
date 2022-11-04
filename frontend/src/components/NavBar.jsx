import React, { useContext } from "react";
import { AppBar, Toolbar, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
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
    height: 96,
  },

  navLink: {
    textDecoration: "none",
  },
}));

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  React.useEffect(() => {
    setAnchorEl(null);
  }, []);

  const handleLogin = () => {
    // TODO: error handling for login
    axios.get("/login").then((res) => {
      let data = res.data;
      // setting user from login data
      setUser({'netid': data.netid})
    });
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
                  variant="h3"
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
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      {user.netid}
                    </Typography>
                    <ArrowDropDownIcon color="primary" />
                  </div>
                  <Menu
                    className={classes.menuBar}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <NavLink
                      className={classes.navLink}
                      strict="true"
                      to="/profile"
                    >
                      <MenuItem onClick={handleClose}>Your Favorites</MenuItem>
                    </NavLink>
                    <MenuItem onClick={handleClose}>Your Reviews</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
