import { Typography } from "@mui/material";
import useStyles from "../styles.js";

export default function Highlights(props) {
  const { popularFor } = props;
  const classes = useStyles();

  // i'm probably going to make bubbles for these at some point
  const popularItems = () => {
    if (popularFor === undefined) {
      return <>Hi</>;
    } else {
      return (
        <ul style={{ marginTop: "5px", paddingLeft: "30px" }}>
          {popularFor.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      );
    }
  };

  return (
    <div className={classes.highlightsContainer}>
      <Typography variant="h5">Highlights</Typography>
      <Typography variant="h6">Popular For</Typography>
      {popularItems()}
    </div>
  );
}
