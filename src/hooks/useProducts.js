import { useEffect, useState } from "react";
import { axiosSecure } from "./useAxios";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const limit = 2;

  useEffect(() => {
    let url;

    console.log(searchText);

    if (searchText) {
      url = `http://localhost:5000/api/v1/product/all?search=${searchText}&page=${
        page + 1
      }&limit=${limit}`;
    } else {
      url = `http://localhost:5000/api/v1/product/all?page=${
        page + 1
      }&limit=${limit}`;
    }
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(url);
        setCount(response?.data?.data?.pageCount);
        setTotal(response?.data?.data?.totalProducts);
        setAllProducts(response?.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [reload, searchText, page]);
  return {
    allProducts,
    setSearchText,
    setAllProducts,
    page,
    setPage,
    count,
    total,
    loading,
    setLoading,
    reload,
    setReload,
  };
};

export default useProducts;
