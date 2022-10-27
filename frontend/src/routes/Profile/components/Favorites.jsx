import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";

import profileData from "../profileData.json";
import SpaceItem from "../../Search/components/SpaceItem";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

const Favorites = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [numSpaces, setNumSpaces] = useState(4);

  const classes = useStyles();

  const getData = () => {
    // this is obviously temporary, will use fetch later
    setData(JSON.parse(JSON.stringify(profileData)));
    // will also set error here using catch promise
  };

  useEffect(() => {
    // TODO: query database for all favorited spaces that a user has
    getData();
    // TODO: error handling
    setError(false);
  }, []);

  const RenderSpaces = ({ numSpaces }) => {
    return (
      <>
        {data?.slice(0, numSpaces).map((space, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SpaceItem key={index} space={space} />
          </Grid>
        ))}
      </>
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
