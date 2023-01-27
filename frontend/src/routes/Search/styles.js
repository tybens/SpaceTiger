import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    padding: "30px",
  },

  searchbar: {
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  addBtn: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
    },
  },

  searchTextField: {
    width: "100%",
    maxWidth: "600px",
  },

  filtersContainer: {
    width: "100%",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },

  filters: {
    "& .MuiFormControl-root": {
      marginLeft: 0,
      marginRight: "15px",
      // width: "200px",
    },
  },

  sort: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& .MuiFormControl-root": {
      marginLeft: 0,
      marginRight: 0,
    },
  },

  spaceContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "1rem",
    justifyContent: "space-between",
    // margin: "30px",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "auto",
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.only("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
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

    display: "flex",
    flexDirection: "column",

    "& h6": {
      fontWeight: 400,
      fontSize: "18px",
      marginBottom: "5px",
    },
  },

  selectForm: {},

  headerBtns: {
    "& button": {
      borderColor: "black",
      textTransform: "none",
      marginLeft: "5px",
      marginBottom: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "30px",
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
}));
