import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/FrontendPage/HomePage/HomePage";
import Registration from "../Pages/FrontendPage/RegistrationPage/Registration";
import ShopPage from "../Pages/FrontendPage/ShopPage/ShopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      // {
      //   path: "/createProduct",
      //   element: <CreateProduct />,
      // },
    ],
  },
]);

export default router;
