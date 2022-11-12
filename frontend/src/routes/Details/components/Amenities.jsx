import { Typography, Chip } from "@mui/material";
import useStyles from "../styles.js";

export default function Amenities(props) {
  const { amenities } = props;
  const classes = useStyles();

  const popularItems = () => {
    if (
      amenities === undefined ||
      amenities.length === 0 ||
      amenities[0].amenity === ""
    ) {
      return <>None listed.</>;
    } else {
      return (
        <div>
          {amenities.map((item) => {
            return (
              <Chip
                key={item.amenity}
                label={item.amenity}
                style={{ margin: "0 5px 6px 0" }}
              />
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={classes.highlightsContainer}>
      <Typography variant="h5">Amenities</Typography>
      {/* <Typography variant="h6" style={{ marginBottom: "6px" }}>
        Popular For
      </Typography> */}
      {popularItems()}
    </div>
  );
}
