import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import ReactRotatingText from "react-rotating-text";
import { Grid, Card, CardContent } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    minHeight: "80vh",
    padding: "10%",
    [theme.breakpoints.up("lg")]: {
      padding: "5% 10%"
    }
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
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) navigate("/search");
  }, [user, navigate]);

  const members = [
    {
      name: "Tyler Benson",
      descrip:
        "I'm a Junior passionate about data science, building random webapps, and climbing! While I'm not coding or climbing I enjoy playing the double bass, surfing, singing, and sleeping.",
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
      descrip: "I'm a Junior in AB Computer Science. In my free time, I love listening to music and roller skating.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668620418/SpaceTiger/IMG_7678_scu9k4.jpg",
    },
    {
      name: "Tri Giao Vu Dinh",
      descrip: "Giao's Description",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668373257/SpaceTiger/photo_zu7wd4.jpg",
    },
    {
      name: "Eva Vesely",
      descrip: "I'm a Junior studying Computer Science with a certificate in Statistics and Machine Learning. In my free time I like to do yoga, write, and discover new drink recipes at my barista job.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668390229/SpaceTiger/PPic_ye5r3p.jpg",
    },
  ];
  const handleButtonClick = () => {
    navigate("/search");
    // if (user) {
    //   navigate("/search");
    // } else {
    //   window.location.href = "/login";
    // }
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
            Find your new favorite space to&nbsp;
            <ReactRotatingText
              items={["study", "hangout", "chill", "study break", "party", "host a meeting"]}
              pause={2500}
            />
          </Typography>
          <Typography variant="h5" color="initial" gutterBottom>
            Whether you're looking for a quiet, busy, secret, comfy, or any kind of space, SpaceTiger makes it easy to search through spots on campus that are perfectly suited to your needs. 
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
          {/* )} */}
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
