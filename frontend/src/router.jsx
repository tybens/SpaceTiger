import { createBrowserRouter } from "react-router-dom";

import {Landing, NotFound, Search, Details, Profile} from "./routes";

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