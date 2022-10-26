import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

import useStyles from "../styles.js";

export default function ImageModal(props) {
  const { open, handleClose, photos } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const renderImages = () => {
    return photos?.map((item) => (
      <ImageListItem key={item}>
        <img
          src={`${item}?w=248&fit=crop&auto=format`}
          srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={"location"}
          loading="lazy"
        />
      </ImageListItem>
    ));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="photos-modal"
      aria-describedby="photos"
    >
      <Box className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Image Gallery
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.modalImages}>
          {!photos?.length && <div>No images uploaded.</div>}
          {matches && (
            <ImageList
              variant="masonry"
              cols={1}
              gap={8}
              className={classes.imageList}
            >
              {renderImages()}
            </ImageList>
          )}
          {!matches && (
            <ImageList
              variant="masonry"
              cols={2}
              gap={8}
              className={classes.imageList}
            >
              {renderImages()}
            </ImageList>
          )}
        </div>
      </Box>
    </Modal>
  );
}
