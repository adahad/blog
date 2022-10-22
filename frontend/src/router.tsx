import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Home from "./routes/Home/Home";
import Create from "./routes/Create/Create";

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
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "create",
        element: <Create />,
      },
    ],
  },
]);

export default router;