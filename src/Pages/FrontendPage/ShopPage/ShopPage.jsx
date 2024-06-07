import useProducts from "../../../hooks/useProducts";

const ShopPage = () => {
  const { allProducts, loading } = useProducts();
  console.log(allProducts);
  return <div className="min-h-[80vh] bg-blue-50 ">this is front </div>;
};

export default ShopPage;
