import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link } from "react-router-dom";

import SpaceItem from "../../../components/SpaceItem";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

const Favorites = ({ user }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [numSpaces, setNumSpaces] = useState(4);

  const classes = useStyles();

  const getData = () => {
    axios
      .get("/getfavorites", {
        params: { user_id: user?.netid },
      })
      .then((res) => {
        let data = res.data;
        setData(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    // TODO: error handling
    setError(false);
    // eslint-disable-next-line
  }, []);

  const RenderSpaces = ({ numSpaces }) => {
    return numSpaces !== 0 ? (
      <>
        {data?.slice(0, numSpaces).map((space, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SpaceItem key={index} space={space} />
          </Grid>
        ))}
      </>
    ) : (
      <Grid item>
        <Typography variant="body1" color="initial">
          You don't have any favorites! Click <Link to={"/search"}>here</Link>{" "}
          to find your next favorite space.
        </Typography>
      </Grid>
    );
  };

  const handleViewMore = () => {
    if (numSpaces + 4 > data?.length) {
      setNumSpaces(data?.length);
    } else {
      setNumSpaces(numSpaces + 4);
    }
  };

  return (
    <Grid item container className={classes.block} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.header}>
          Your favorite spaces
        </Typography>
      </Grid>
      {error ? (
        <Grid item>
          <Typography variant="body1" color="initial">
            A server error occurred. Please contact the system administrator.
          </Typography>
        </Grid>
      ) : (
        <>
          <RenderSpaces numSpaces={numSpaces} />
          {numSpaces < data?.length && (
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                <IconButton aria-label="load more" onClick={handleViewMore}>
                  <AddIcon />
                </IconButton>
              </Button>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Favorites;
