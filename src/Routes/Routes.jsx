import { createBrowserRouter } from "react-router-dom";
import ViewProfile from "../Components/Shared/SideNavbar/ViewProfile";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AboutPage from "../Pages/FrontendPage/AboutPage/AboutPage";
import HomePage from "../Pages/FrontendPage/HomePage/HomePage";
import Registration from "../Pages/FrontendPage/RegistrationPage/Registration";
import ShopPage from "../Pages/FrontendPage/ShopPage/ShopPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // {
      //   path: "/shop",
      //   element: <ShopPage />,
      // },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      // {
      //   path: "/createProduct",
      //   element: <CreateProduct />,
      // },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <ViewProfile></ViewProfile>,
          },
          {
            path: "/dashboard/products",
            element: <ShopPage></ShopPage>,
            children: [
              {
                path: "/dashboard/products",
                element: <AboutPage></AboutPage>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
