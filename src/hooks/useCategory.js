import { useEffect, useState } from "react";

const useCategory = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://panchahut-server.vercel.app/api/v1/category"
        );
        const data = await response.json();

        setAllCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [loading, reload]);
  return {
    allCategory,
    setAllCategory,
    loading,
    setLoading,
    reload,
    setReload,
  };
};

export default useCategory;
