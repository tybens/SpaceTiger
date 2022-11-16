import { useContext, useEffect } from "react";
import { UserContext } from "./context";
import { useNavigate, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import {
  Landing,
  NotFound,
  Search,
  Details,
  Profile,
  LoginRedirect,
} from "./routes";

const PageWrapper = ({ Page, auth }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !user) navigate("/");
  }, [auth, user, navigate]);

  useEffect(() => {
    if (!user) {
      axios
        .get("/user_logged_in")
        .then((res) => {
          let data = res.data;
          // setting user from login data
          if (data.netid) {
            setUser({ netid: data.netid });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <>
      <NavBar />
      <Page />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper Page={Landing} />,
    errorElement: <NotFound />,
  },
  {
    path: "/search/:query",
    element: <PageWrapper Page={Details} />,
  },
  {
    path: "/search",
    element: <PageWrapper Page={Search} />,
  },
  {
    path: "/profile",
    element: <PageWrapper Page={Profile} auth={true} />,
  },
  {
    path: "/loginredirect",
    element: <PageWrapper Page={LoginRedirect} />,
  },
]);

export default router;
