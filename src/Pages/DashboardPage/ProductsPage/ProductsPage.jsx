import { Outlet } from "react-router-dom";
import TopNavbar from "../../../Components/Shared/SideNavbar/TopNavbar";

const ProductsPage = () => {
  const routes = [
    { id: 1, path: "/dashboard/products/all", name: " All Products" },
    { id: 2, path: "/dashboard/products/addproducts", name: "Add Product" },
    { id: 2, path: "/dashboard/products/addcategory", name: "Category " },
  ];
  return (
    <div>
      <div>
        <TopNavbar routes={routes}></TopNavbar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProductsPage;
