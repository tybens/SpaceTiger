import { createBrowserRouter } from "react-router-dom";

import Landing from "./routes/Landing";
import NotFound from "./routes/NotFound";
import Search from "./routes/Search";
import Details from "./routes/Details";
import Profile from "./routes/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/search/:query",
    element: <Details />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

export default router;