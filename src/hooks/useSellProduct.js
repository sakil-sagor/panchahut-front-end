import { useEffect, useState } from "react";

const useSellProduct = () => {
  const [searchProduct, setSearchProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://panchahut-server.vercel.app/api/v1/sales/searchsellproduct/"
        );
        const data = await response.json();

        setSearchProduct(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [reload]);
  return {
    allProducts,
    setAllProducts,
    loading,
    setLoading,
    reload,
    setReload,
  };
};

export default useSellProduct;
