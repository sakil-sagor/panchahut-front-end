import { AiFillDatabase } from "react-icons/ai";
import SingleProduct from "../../../Components/DashboardComponent/ProductsCompo/SingleProduct";
import Loading from "../../../Components/Shared/Loading/Loading";
import useProducts from "../../../hooks/useProducts";

const ShopPage = () => {
  const { allProducts, loading } = useProducts();
  console.log(allProducts);
  return (
    <div className="min-h-[80vh] bg-blue-50 ">this is front shop page</div>
  );
};

export default ShopPage;
