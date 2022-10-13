import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import router from "./router";

import store from "./store";
import theme from "./theme";
import { Provider } from "react-redux";
import { UserContext } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </UserContext.Provider>
  );
};

root.render(<App />);
