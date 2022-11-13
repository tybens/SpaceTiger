import { useContext, useEffect } from "react";
import { UserContext } from "./context";
import { useNavigate, createBrowserRouter } from "react-router-dom";

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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !user) navigate("/");
  }, [auth, user, navigate]);
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
