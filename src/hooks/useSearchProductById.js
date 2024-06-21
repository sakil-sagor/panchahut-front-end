import { useEffect, useState } from "react";

const useSearchProductById = () => {
  const [searchText, setSearchText] = useState(0);
  const [searchResult, setSearchResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://panchahut-server.vercel.app/api/v1/product/${searchText}`
        );
        const data = await response.json();
        setSearchResult(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };
    if (searchText) {
      fetchProducts();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchText]);
  return {
    searchText,
    setSearchText,
    searchResult,
    setSearchResult,
    reload,
    setReload,
    loading,
    setLoading,
  };
};

export default useSearchProductById;
