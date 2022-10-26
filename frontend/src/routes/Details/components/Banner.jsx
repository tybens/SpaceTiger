import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import useStyles from "../styles.js";

export default function Banner(props) {
  const [img, setImg] = useState("");
  const { photos } = props;
  const classes = useStyles();

  useEffect(() => {
    if (photos === undefined) {
      setImg("");
    } else if (photos?.length) {
      setImg(photos[0]);
    } else {
      // placeholder
      setImg(
        "https://www.cellmax.eu/wp-content/uploads/2020/01/Hero-Banner-Placeholder-Dark-1024x480-1.png"
      );
    }
  }, [photos]);

  return (
    <div className={classes.banner} style={{ backgroundImage: `url(${img})` }}>
      <Button
        variant="contained"
        startIcon={<PhotoLibraryIcon />}
        className={classes.bannerBtn}
      >
        {photos?.length} Photos
      </Button>
    </div>
  );
}
