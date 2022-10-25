import { useState, useEffect } from "react";

import useStyles from "../styles.js";

import { Typography } from "@material-ui/core";

export default function SpaceItem(props) {
  const { space } = props;

  // useEffect(() => {
  //   console.log(props);
  // }, []);

  const classes = useStyles();

  // return <div></div>;
  return (
    <>
      {space && (
        <div className={classes.spaceItem}>
          <Typography variant="h6">{space.name}</Typography>
          <p>
            {space.location} | {space.rating} avg rating
          </p>
          <img
            className={classes.spaceImg}
            src={space.photos[0]}
            alt={space.name}
          />
        </div>
      )}
    </>
  );
}
