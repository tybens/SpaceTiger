import React, { useContext } from "react";
import { AppBar, Toolbar, Menu, MenuItem } from "@material-ui/core";
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
  const [auth, setAuth] = React.useState();
  const [netid, setNetId] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setAuth(true);
    setNetId("tgdinh");
    setAnchorEl(null);
  }, []);

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
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      {netid}
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
