import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login/Login";
import Home from "./routes/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
