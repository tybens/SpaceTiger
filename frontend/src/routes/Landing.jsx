import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import { Grid, Card, CardContent } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    minHeight: "80vh",
    padding: "10%",
  },

  image: {
    height: "100%",
    width: "100%",
    margin: "5% 0",
    objectFit: "cover",
  },

  textBox: {
    paddingRight: "10%",
  },

  getStartedButton: {
    textTransform: "none",
  },
}));

const MemberCard = ({ member }) => {
  return (
    <Card raised={true} key={member.name} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.descrip}
        </Typography>
      </CardContent>
      <CardContent>
        <img
          style={{ borderRadius: 2 }}
          src={member.image}
          alt={member.name}
          height="100%"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

export default function Landing() {
  const classes = useStyles();
  const navigate = useNavigate();

  const members = [
    {
      name: "Tyler Benson",
      descrip: "Tyler's Fancy Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
    {
      name: "Thanya Begum",
      descrip: "Thanya's Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
    {
      name: "Chenhan Zhang",
      descrip: "Chenhan's Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
    {
      name: "Tri Giao Vu Dinh",
      descrip: "Giao's Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
    {
      name: "Eva Vesely",
      descrip: "Eva's Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
  ];
  const handleButtonClick = () => {
    /* 
    Using fetch to fetch the api from
    flask server. The endpoint will be redirected because of yarn's 
    proxy set in package.json 
    */
    // axios.get("/getspaces", { params: { isbn: "123" } }).then((res) => {
    //   let data = res.data;
    //   // Setting a data from api
    //   console.log(data);
    // });

    navigate("/search");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item container direction="row" className={classes.block}>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs={12}
          md={6}
          className={classes.textBox}
        >
          <Typography
            gutterBottom
            style={{ height: "inherit" }}
            variant="h3"
            color="initial"
          >
            Some eye-catching tagline for our app.
          </Typography>
          <Typography variant="h5" color="initial" gutterBottom>
            A quick and attention grabbing summary of what our app does for
            students (I think, I'm not too sure).
          </Typography>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              fullWidth={false}
              className={classes.getStartButton}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            className={classes.image}
            height="100%"
            alt="A tiger in space"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fbddf6686-6128-408a-a2a1-09341001a276%2Fd9n18w1-5f8c062d-d0cc-4dac-b46f-ed826bab3249.jpg%2Fv1%2Ffill%2Fw_1032%2Ch_774%2Cq_70%2Cstrp%2Fspace_tiger_by_goldenspiraldesigns_d9n18w1-pre.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04NTAwIiwicGF0aCI6IlwvZlwvYmRkZjY2ODYtNjEyOC00MDhhLWEyYTEtMDkzNDEwMDFhMjc2XC9kOW4xOHcxLTVmOGMwNjJkLWQwY2MtNGRhYy1iNDZmLWVkODI2YmFiMzI0OS5qcGciLCJ3aWR0aCI6Ijw9MTEzMzMifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.z0Tf0rx_NtzOE7jUOH9pKXGJHc6MIRUJCmkhChSVqcM&f=1&nofb=1&ipt=abca2a18804d2dc6a34f25905844a642b3c6764e1791377af922f07a55726ebe&ipo=images"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        className={classes.block}
      >
        <Grid item container spacing={3} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h3" color="initial">
              Meet the Team
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" spacing={3}>
            {members.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.name}>
                <MemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
