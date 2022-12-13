import { Typography, Chip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChairIcon from "@mui/icons-material/Chair";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LockIcon from "@mui/icons-material/Lock";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WashIcon from "@mui/icons-material/Wash";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import useStyles from "../styles.js";
import {
  noisiness,
  privacy,
  lighting,
  cleanliness,
} from "../../Search/utils.js";

export default function Amenities(props) {
  const { amenities, position, label, space } = props;
  const classes = useStyles();

  console.log(space);

  const renderDetails = () => {
    return (
      <div style={{ marginBottom: "10px" }}>
        {space?.type && (
          <div className={classes.filterDiv}>
            <ChairIcon /> &nbsp;{space?.type}
          </div>
        )}
        {space?.capacity && (
          <div className={classes.filterDiv}>
            <PeopleAltIcon /> &nbsp;{space?.capacity} people
          </div>
        )}
        {space?.noisiness && (
          <div className={classes.filterDiv}>
            <VolumeUpIcon /> &nbsp;{noisiness(space?.noisiness)}
          </div>
        )}
        {space?.privacy && (
          <div className={classes.filterDiv}>
            <LockIcon /> &nbsp;{privacy(space?.privacy)}
          </div>
        )}
        {space?.lighting && (
          <div className={classes.filterDiv}>
            <LightbulbIcon /> &nbsp;{lighting(space?.lighting)}
          </div>
        )}
        {space?.cleanliness && (
          <div className={classes.filterDiv}>
            <WashIcon /> &nbsp;{cleanliness(space?.cleanliness)}
          </div>
        )}
      </div>
    );
  };

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
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Additional info
      </Typography>
      {renderDetails()}
      <Typography variant="h6" style={{ marginTop: "15px" }}>
        Amenities
      </Typography>
      {popularItems()}
      {position && (
        <div style={{ marginTop: "30px" }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className={classes.mapContainer}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>{label}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
