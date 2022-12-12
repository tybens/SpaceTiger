import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "320px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "row",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "40%",
  },

  backbutton: {
    margin: "30px",
    backgroundColor: "white",
    textTransform: "none",
    font_weight: "bold",
  },

  bannerBtn: {
    margin: "30px",
    backgroundColor: "white",
    textTransform: "none",
  },

  header: {
    // backgroundColor: "#ddd",
    padding: "0px 30px",
  },

  headerFirst: {
    margin: "20px 0px 5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      "& h4": {
        order: 1,
      },
    },
  },

  headerBtns: {
    "& button, a": {
      borderColor: "black",
      textTransform: "none",
      marginLeft: "5px",
      marginBottom: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start !important",
      order: 0,
      marginLeft: "2px",
      marginBottom: "15px",
      "& button": {
        marginRight: "5px",
        marginLeft: "0px",
      },
    },
  },

  headerSecond: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },

  stars: {
    "& .MuiRating-icon": {
      color: "black",
    },
  },

  tag: {
    margin: "0 5px",
    borderRadius: "10px",
    backgroundColor: "antiquewhite",
    padding: "5px",
    color: "black",
  },

  itemContainer: {
    display: "flex",
    padding: "30px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  highlightsContainer: {
    width: "28%",
    "& h5": {
      fontWeight: 600,
      marginBottom: "10px",
    },
    "& h6": {
      fontWeight: 600,
    },
    [theme.breakpoints.only("sm")]: {
      width: "40%",
      marginBottom: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginBottom: "20px",
    },
    // backgroundColor: "red",
  },

  reviewsContainer: {
    width: "70%",
    "& h5": {
      fontWeight: 600,
      marginBottom: "10px",
    },
    [theme.breakpoints.only("sm")]: {
      width: "58%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    // backgroundColor: "gray",
  },

  reviewGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "1rem",
    justifyContent: "space-between",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },

  reviewItem: {
    padding: "25px 15px",
    width: "100%",
    border: "1px solid #b8b8b8",
    display: "flex",
    flexDirection: "column",
  },

  modalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    maxWidth: "800px",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
    padding: "20px 30px 30px",
    maxHeight: "80vh",
    // overflow: "scroll",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },

  modalImages: {
    maxHeight: "65vh",
    overflow: "scroll",
  },

  modalForm: {
    maxHeight: "65vh",
    overflow: "scroll",

    "& h6": {
      fontWeight: 600,
      marginBottom: "5px",
    },
  },

  featureContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "1rem",
    justifyContent: "space-between",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
    marginBottom: "20px",
  },

  featureItem: {
    display: "flex",
    flexDirection: "column",
  },

  mapContainer: {
    height: "400px",
  },

  filterDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "3px",
  },
}));
