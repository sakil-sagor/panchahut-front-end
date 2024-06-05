import { useEffect, useState } from "react";

const useAllStockIn = () => {
  const [allStocksIn, setAllStocksIn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://panchahut-server.vercel.app/api/v1/stocks/stockin"
        );
        const data = await response.json();

        setAllStocksIn(data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [reload]);
  return {
    allStocksIn,
    setAllStocksIn,
    loading,
    setLoading,
    reload,
    setReload,
  };
};

export default useAllStockIn;
