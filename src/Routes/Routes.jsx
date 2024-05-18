import { createBrowserRouter } from "react-router-dom";
import ViewProfile from "../Components/Shared/SideNavbar/ViewProfile";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddCategory from "../Pages/DashboardPage/ProductsPage/AddCategory/AddCategory";
import AddProduct from "../Pages/DashboardPage/ProductsPage/AddProduct/AddProduct";
import AllProducts from "../Pages/DashboardPage/ProductsPage/AllProducts/AllProducts";
import ProductsPage from "../Pages/DashboardPage/ProductsPage/ProductsPage";
import HomePage from "../Pages/FrontendPage/HomePage/HomePage";
import Registration from "../Pages/FrontendPage/RegistrationPage/Registration";
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
        path: "login",
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
            element: <ProductsPage></ProductsPage>,
            children: [
              {
                path: "/dashboard/products/allproducts",
                element: <AllProducts></AllProducts>,
              },
              {
                path: "/dashboard/products/addproducts",
                element: <AddProduct></AddProduct>,
              },
              {
                path: "/dashboard/products/addcategory",
                element: <AddCategory></AddCategory>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
