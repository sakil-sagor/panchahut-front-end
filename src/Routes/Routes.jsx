import { createBrowserRouter } from "react-router-dom";
import ViewProfile from "../Components/Shared/SideNavbar/ViewProfile";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddCategory from "../Pages/DashboardPage/ProductsPage/AddCategory/AddCategory";
import AddProduct from "../Pages/DashboardPage/ProductsPage/AddProduct/AddProduct";
import AllProducts from "../Pages/DashboardPage/ProductsPage/AllProducts/AllProducts";
import ProductsPage from "../Pages/DashboardPage/ProductsPage/ProductsPage";
import SalesPage from "../Pages/DashboardPage/SalesPage/SalesPage";
import SellProductPage from "../Pages/DashboardPage/SalesPage/SellProductPage/SellProductPage";
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
      {
        path: "/products",
        element: <HomePage />,
      },
      {
        path: "/aboutUs",
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
                path: "/dashboard/products",
                element: <AllProducts></AllProducts>,
              },
              {
                path: "/dashboard/products/all",
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
          {
            path: "/dashboard/sales",
            element: <SalesPage></SalesPage>,
            children: [
              {
                path: "/dashboard/sales/customer1",
                element: <SellProductPage></SellProductPage>,
              },
              {
                path: "/dashboard/sales/customer2",
                element: <SellProductPage></SellProductPage>,
              },
              {
                path: "/dashboard/sales/customer3",
                element: <SellProductPage></SellProductPage>,
              },
              {
                path: "/dashboard/sales/customer4",
                element: <SellProductPage></SellProductPage>,
              },
              {
                path: "/dashboard/sales/customer5",
                element: <SellProductPage></SellProductPage>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
