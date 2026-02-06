import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Shop from "./components/Shop";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/shop",
        element: <Shop />,
      },
    ]
  },
];

export default routes;