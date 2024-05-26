import React, { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import ProductSearchSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/ProductSearchSaleComp";
import SearchProductSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/SearchProductSaleComp";
import { getStoredData } from "../../../../utils/localStorage";

const SellProductPage = () => {
  const [searchText, setSearchText] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [addToCart, setAddToCart] = useState([]);
  const [count, setCount] = useState(1);
  const [reload, setReload] = useState(0);
  const pathname = location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [lastElement] = pathSegments.slice(-1);

  useEffect(() => {
    if (searchText) {
      const url = `http://localhost:5000/api/v1/product/${searchText}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setSearchResult(data.data);
        });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchText]);

  useEffect(() => {
    const result = getStoredData(lastElement);
    setAddToCart(result);
  }, [lastElement, reload]);

  const handelCountQuentity = (productId, boolean) => {
    const result = getStoredData(lastElement);
    const plus = result.map((product) => {
      if (product.productId === productId) {
        let newValue = boolean
          ? product.orderQuentity + 1
          : product.orderQuentity - 1;

        return { ...product, orderQuentity: Math.max(1, newValue) };
      }
      return product;
    });

    localStorage.setItem(lastElement, JSON.stringify(plus));
    setReload(reload + 1);
  };
  console.log(searchText);
  console.log(searchResult);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <div>
            <ProductSearchSaleComp
              setSearchText={setSearchText}
            ></ProductSearchSaleComp>
          </div>
          {searchResult && searchText ? (
            <div>
              <SearchProductSaleComp
                searchResult={searchResult}
                setSearchText={setSearchText}
                setSearchResult={setSearchResult}
                setReload={setReload}
                lastElement={lastElement}
                reload={reload}
              ></SearchProductSaleComp>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="">
          <div>
            <table className="w-full table-auto text-center">
              <thead>
                <tr className=" ">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>

              <tbody>
                {addToCart?.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}
                  >
                    <td className="px-4 py-2 text-left">
                      {product?.productName}
                    </td>

                    <td className="px-4 py-2 text-blue-700 font-semibold">
                      {product?.regularPrice} Tk
                    </td>
                    <td className=" text-orange-700 ">
                      <div className="flex items-center gap-4 justify-center">
                        <CiSquarePlus
                          onClick={() =>
                            handelCountQuentity(product?.productId, true)
                          }
                          className="text-4xl text-gray-500 cursor-pointer hover:text-gray-700"
                        />

                        <span className="font-bold">
                          {product.orderQuentity}
                        </span>
                        <CiSquareMinus
                          onClick={() =>
                            handelCountQuentity(product?.productId, false)
                          }
                          className="text-4xl text-gray-500 cursor-pointer  hover:text-gray-700"
                        />
                      </div>
                    </td>

                    <td className="md:px-4 py-2">
                      {product?.regularPrice * product.orderQuentity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProductPage;
