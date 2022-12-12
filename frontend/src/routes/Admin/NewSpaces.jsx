import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { UserContext } from "../../context";

import RenderSpaces from "../../components/RenderSpaces";
import { Loader } from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

const NewSpaces = () => {
  const { user } = useContext(UserContext);

  const [numSpaces, setNumSpaces] = useState(4);
  const [data, setNewSpaceData] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const classes = useStyles();

  const getData = () => {
    // TODO: add && user?.admin
    if (user) {
      axios
        .get("/getawaitingapproval")
        .then((res) => {
          let data = res.data;
          setNewSpaceData(data.spaces);
          setPhotos(data.photos);
          setLoaded(true);
        })
        .catch((err) => setError(true));
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [user]);

  const handleApproval = (approval, spaceId) => {
    // TODO: backend handle approval
    axios
      .get("/approve", {
        params: { user_id: user?.netid, space_id: spaceId, approval: approval },
      })
      .then((res) => {
        //   let data = res.data;
        console.log("Success!");
        getData();
      })
      .catch((err) => {
        setError(true);
        console.log(error);
      });
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
          Spaces Awaiting Approval
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
          {!loaded && <Loader />}
          {loaded && (
            <>
              <RenderSpaces
                spaces={data}
                photos={photos}
                handleApproval={handleApproval}
                approvalSpaces={true}
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
                    <IconButton aria-label="load more">
                      <AddIcon />
                    </IconButton>
                  </Button>
                </Grid>
              )}
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default NewSpaces;
