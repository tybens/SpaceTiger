import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import RenderSpaces from "../../../components/RenderSpaces";
import { Loader } from "../../../components/Loader";

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
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [numSpaces, setNumSpaces] = useState(4);
  const [loaded, setLoaded] = useState(false);

  const classes = useStyles();

  const getData = () => {
    axios
      .get("/getfavorites", {
        params: { user_id: user?.netid },
      })
      .then((res) => {
        let data = res.data;
        setData(data.spaces);
        setPhotos(data.photos);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    getData();
    // TODO: error handling
    setError(false);
    // eslint-disable-next-line
  }, []);

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
          Your Favorites ({data?.length})
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
          {loaded && (
            <>
              <RenderSpaces
                spaces={data}
                photos={photos}
                numSpaces={numSpaces}
              />
              {numSpaces < data?.length && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleViewMore}
                    fullWidth
                  >
                    {/* <IconButton aria-label="load more"> */}
                    <AddIcon />
                    {/* </IconButton> */}
                  </Button>
                </Grid>
              )}
            </>
          )}
          {!loaded && <Loader />}
        </>
      )}
    </Grid>
  );
};

export default Favorites;
