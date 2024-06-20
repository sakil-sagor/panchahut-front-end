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
import AllStocksPage from "../Pages/DashboardPage/StocksPage/AllStocksPage/AllStocksPage";
import StockInPage from "../Pages/DashboardPage/StocksPage/StockInPage/StockInPage";
import StockOutPage from "../Pages/DashboardPage/StocksPage/StockOutPage/StockOutPage";
import StocksPage from "../Pages/DashboardPage/StocksPage/StocksPage";
import TotalStockPage from "../Pages/DashboardPage/StocksPage/TotalStockPage/TotalStockPage";
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

      {
        path: "login",
        element: <Registration></Registration>,
      },

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
            ],
          },
          {
            path: "/dashboard/stocks",
            element: <StocksPage></StocksPage>,
            children: [
              {
                path: "/dashboard/stocks/total",
                element: <TotalStockPage></TotalStockPage>,
              },
              {
                path: "/dashboard/stocks/allstocks",
                element: <AllStocksPage></AllStocksPage>,
              },
              {
                path: "/dashboard/stocks/stocksin",
                element: <StockInPage></StockInPage>,
              },
              {
                path: "/dashboard/stocks/stocksout",
                element: <StockOutPage></StockOutPage>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
