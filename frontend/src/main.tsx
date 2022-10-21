import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </MantineProvider>
);
