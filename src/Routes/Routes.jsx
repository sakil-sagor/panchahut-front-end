import { createBrowserRouter } from "react-router-dom";
import CreateProduct from "../Components/DashboardComponent/CreateProduct";
import Main from "../Layout/Main";
import HomePage from "../Pages/FrontendPage/HomePage/HomePage";
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
        path: "/createProduct",
        element: <CreateProduct />,
      },
    ],
  },
]);

export default router;
