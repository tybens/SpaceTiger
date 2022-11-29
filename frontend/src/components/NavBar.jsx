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
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px !important",
    },
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

  rightNav: {
    [theme.breakpoints.down("sm")]: {
      // marginTop: "10px !important",
    },
  },
}));

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // reset the user context
    setUser(null);
    // make a GET request to '/logout'
    // have to make a link and click it or react-router will think
    // i want to render react pages at '/logout', which doesn't exist
    var link = document.createElement("a");
    link.href = "/logout";
    document.body.appendChild(link);
    link.click();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setAnchorEl(null);
  }, []);

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
            <Grid item className={classes.rightNav}>
              <div style={{ display: "flex" }}>
                <Link to="/search">
                  <Button
                    className={classes.navLink}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "20px" }}
                  >
                    Search
                  </Button>
                </Link>
                {!user ? (
                  <a href="/login">
                    <Button
                      className={classes.navLink}
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </a>
                ) : (
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h6"
                        onClick={handleMenu}
                        color="inherit"
                        style={{ cursor: "pointer" }}
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
                      style={{ pointer: "cursor" }}
                    >
                      <NavLink
                        className={classes.navLink}
                        strict="true"
                        to="/profile"
                      >
                        <MenuItem onClick={handleClose}>Your Profile</MenuItem>
                      </NavLink>
                      {user.admin && (
                        <NavLink
                          className={classes.navLink}
                          strict="true"
                          to="/admin"
                        >
                          <MenuItem onClick={handleClose}>Admin</MenuItem>
                        </NavLink>
                      )}
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
