import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserContext } from "../../context";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import SpaceItem from "../../components/SpaceItem";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    padding: "30px",
  },
}));

const ApprovalDissaproval = ({ handleClick }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Grid item>
        <LoadingButton
          startIcon={<DoneIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(true);
          }}
          loading={loading}
          variant="outlined"
          color="secondary"
        >
          Approve
        </LoadingButton>
      </Grid>
      <Grid item>
        <LoadingButton
          startIcon={<CloseIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(false);
          }}
          loading={loading}
          variant="outlined"
          color="error"
        >
          Disapprove
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

const NewSpaces = () => {
  const { user } = useContext(UserContext);

  const [numSpaces, setNumSpaces] = useState(4);
  const [data, setNewSpaceData] = useState(null);
  const [error, setError] = useState(false);

  const classes = useStyles();

  const getData = () => {
    // TODO: add && user?.admin
    if (user) {
      axios
        .get("/getfavorites", {
          params: { user_id: user?.netid },
        })
        .then((res) => {
          let data = res.data;
          setNewSpaceData(data.items);
        })
        .catch((err) => setError(true));
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [user]);

  const handleApproval = (approval) => {
    // TODO: backend handle approval
    axios
      .get("/approve", {
        params: { user_id: user?.netid, space_id: 0, approval: approval },
      })
      .then((res) => {
        //   let data = res.data;
        console.log("Success!");
      })
      .catch((err) => {
        setError(true);
        console.log(error);
      });
  };

  const RenderSpaces = ({ numSpaces }) => {
    return numSpaces !== 0 ? (
      <>
        {data?.slice(0, numSpaces).map((space, index) => (
          <Grid item key={index} container xs={12} sm={6} md={4} lg={3}>
            <SpaceItem space={space} />
            <ApprovalDissaproval handleClick={handleApproval} />
          </Grid>
        ))}
      </>
    ) : (
      <Grid item>
        <Typography variant="body1" color="initial">
          No spaces to approve! Nothing to worry about!
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

export default NewSpaces;
