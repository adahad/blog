import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home/Home";
import Create from "./routes/Create/Create";
import PostPage from "./routes/PostPage/PostPage";

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
        path: "create",
        element: <Create />,
      },
      {
        path: "/posts/:postid",
        element: <PostPage />,
      },
    ],
  },
]);

export default router;
