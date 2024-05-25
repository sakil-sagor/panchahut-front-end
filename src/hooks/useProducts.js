import { useEffect, useState } from "react";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/v1/product/all"
        );
        const data = await response.json();

        setAllProducts(data.data);
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

export default useProducts;
