import { Typography, Chip } from "@mui/material";
import useStyles from "../styles.js";

export default function Highlights(props) {
  const { popularFor } = props;
  const classes = useStyles();

  const popularItems = () => {
    if (popularFor === undefined) {
      return <></>;
    } else {
      return (
        <div>
          {popularFor.map((item) => {
            return (
              <Chip key={item} label={item} style={{ margin: "0 5px 6px 0" }} />
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={classes.highlightsContainer}>
      <Typography variant="h5">Highlights</Typography>
      <Typography variant="h6" style={{ marginBottom: "6px" }}>
        Popular For
      </Typography>
      {popularItems()}
    </div>
  );
}
