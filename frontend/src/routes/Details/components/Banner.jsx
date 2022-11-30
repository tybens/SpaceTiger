import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ImageModal from "./ImageModal.jsx";

import useStyles from "../styles.js";

export default function Banner(props) {
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    navigate(-1);
  };

  const { photos } = props;
  const classes = useStyles();

  useEffect(() => {
    if (photos === undefined) {
      setImg("");
    } else if (photos?.length) {
      setImg(photos[0].src);
    } else {
      // placeholder
      setImg(
        "https://www.cellmax.eu/wp-content/uploads/2020/01/Hero-Banner-Placeholder-Dark-1024x480-1.png"
      );
    }
  }, [photos]);

  return (
    <div
      className={classes.banner}
      style={{
        backgroundImage: `url(${
          img
            ? img
            : "https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png"
        })`,
      }}
    >
      {img.trim() && (
        <>
          <div>
            <Button
              variant="contained"
              onClick={handleClick}
              startIcon={<ArrowBackIcon />}
              className={classes.backbutton}
            >
              Back
            </Button>
          </div>
          <div style={{height: "100%", display: "flex", alignItems: "flex-end"}}>
            <Button
              variant="contained"
              startIcon={<PhotoLibraryIcon />}
              className={classes.bannerBtn}
              onClick={handleOpen}
            >
              {photos?.length} Photos
            </Button>
          </div>

          <ImageModal open={open} handleClose={handleClose} photos={photos} />
        </>
      )}
    </div>
  );
}
