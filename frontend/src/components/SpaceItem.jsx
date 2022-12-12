import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// import { Rating } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  spaceItem: {
    // border: "1px solid #b8b8b8",
    // padding: "15px",
    // height: "250px",
    marginBottom: "2%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },

  spaceImg: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    height: "210px",
    bottom: 0,
  },

  spaceText: {
    border: "1px solid #b8b8b8",
    padding: "10px 15px 15px",
    "& h6": {
      fontWeight: 600,
    },
    "& p": {
      color: "#666",
      marginTop: "3px",
      marginBottom: "12px",
    },
  },
}));

export default function SpaceItem(props) {
  const { space, photo, approved, mySpaces } = props;
  const [src, setSrc] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (!photo) {
      setSrc("https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png");
    } else if (photo?.src === "") {
      setSrc("https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png");
    } else {
      setSrc(photo?.src);
    }
  }, [photo, setSrc]);

  return (
    <>
      {space && (
        <Link to={`/search/${space.id}`}>
          <div className={classes.spaceItem}>
            <img
              className={classes.spaceImg}
              src={src}
              alt={space.name}
            />
            <div className={classes.spaceText}>
              {mySpaces && !approved && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      border: "solid 1px red",
                      padding: "0 5px",
                      color: "red",
                    }}
                  >
                    Awaiting Admin Approval
                  </span>
                </div>
              )}
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
