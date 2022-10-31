import { Link } from "react-router-dom";

import useStyles from "../styles.js";

import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// import { Rating } from "@mui/material";

export default function SpaceItem(props) {
  const { space } = props;

  const classes = useStyles();

  return (
    <>
      {space && (
        <Link to={`/search/${space.id}`}>
          <div className={classes.spaceItem}>
            <img
              className={classes.spaceImg}
              src={space.photos[0]}
              alt={space.name}
            />
            <div className={classes.spaceText}>
              <Typography variant="h6">{space.name}</Typography>
              <p>{space.location}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <StarIcon fontSize="30px" /> &nbsp;{space.rating}
              </div>
              {/* { this is one option, looks super cool */
              /* <Rating
              name="read-only"
              value={space.rating}
              precision={0.1}
              size="small"
              readOnly
            /> */}
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
