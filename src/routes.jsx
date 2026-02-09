import RootLayout from "./layouts/RootLayout/RootLayout";
import ErrorPage from "./layouts/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <ErrorPage /> },
    ],
  }
];

export default routes;