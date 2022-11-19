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
  Admin,
} from "./routes";

const PageWrapper = ({ Page, auth, admin }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !user) navigate("/");

    // if admin is required, check for admin
    if (admin && !user?.admin) navigate("/");
  }, [auth, user, admin, navigate]);

  useEffect(() => {
    if (!user) {
      axios
        .get("/user_logged_in")
        .then((res) => {
          let data = res.data;
          // setting user from login data
          // TODO: update backend to return admin
          if (data.netid) {
            setUser({ netid: data.netid, admin: data?.admin });
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
    errorElement: <NotFound />,
  },
  {
    path: "/search",
    element: <PageWrapper Page={Search} />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <PageWrapper Page={Profile} auth={true} />,
    errorElement: <NotFound />,
  },
  {
    path: "/admin",
    // TODO: change this back to true, true
    element: <PageWrapper Page={Admin} auth={false} admin={false} />,
    errorElement: <NotFound />,
  },
  {
    path: "/loginredirect",
    element: <PageWrapper Page={LoginRedirect} />,
    errorElement: <NotFound />,
  },
]);

export default router;
