import { createBrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Landing, NotFound, Search, Details, Profile, LoginRedirect } from "./routes";

const PageWrapper = ({ Page }) => {
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
    element: <PageWrapper Page={Profile} />,
  },
  {
    path: "/loginredirect",
    element: <PageWrapper Page={LoginRedirect} />
  }
]);

export default router;
