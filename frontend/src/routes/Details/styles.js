import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "320px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "end",
    alignItems: "flex-end",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "40%",
  },

  bannerBtn: {
    margin: "30px",
    backgroundColor: "white",
    textTransform: "none",
  },
}));
