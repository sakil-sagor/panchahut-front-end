import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthState } from "../../../contexts/AuthProvider";
import { getStoredData } from "../../../utils/localStorage";
const SearchProductSaleComp = ({
  searchResult,
  lastElement,
  setSearchResult,
  setReload,
  reload,
  setSearchText,
}) => {
  const { user } = AuthState();
  //   const pathname = location.pathname;
  //   const pathSegments = pathname.split("/").filter((segment) => segment);
  //   const [lastElement] = pathSegments.slice(-1);
  const [count, setCount] = useState(1);
  //   const [reload, setReload] = useState(0);

  const buttonRef = useRef(null);

  //   useEffect(() => {
  //     const result = getStoredData(lastElement);
  //     setAddToCart(result);
  //   }, [lastElement, reload]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        buttonRef.current.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handeladdToCart = (product) => {
    console.log(product);
    const cartData = {
      productId: product?.productIdNumber,
      stockId: product?._id,
      productName: product?.product?.productName,
      weight: product?.product?.weight,
      weightUnit: product?.product?.weightUnit,
      regularPrice: product?.regularPrice,
      discount: product?.discount,
      orderQuentity: 1,
    };
    let oldCart = getStoredData(lastElement);
    const result = oldCart.find(
      (product) => product.stockId === cartData?.stockId
    );
    if (result) {
      toast.error("alrady Exist");
    } else {
      localStorage.setItem(lastElement, JSON.stringify([...oldCart, cartData]));
    }
    const searchInput = document.getElementById(
      "searchProductIdForProductSerach"
    );
    searchInput.value = "";
    setSearchResult([]);
    setSearchText(0);
    setReload(reload + 1);
  };
  console.log(searchResult);
  return (
    <div className="">
      <div>
        {searchResult?.map((product) => (
          <div key={product?._id}>
            <div className="border shadow-md p-2">
              <div>
                <div className="flex justify-between items-center">
                  <div className="max-w-16 max-h-16">
                    <img
                      className="rounded-md"
                      src={product?.product?.productImage}
                      alt=""
                    />
                  </div>
                  <p>{product?.product?.productName}</p>
                  <p>{product?.quantity}</p>
                  <p>{product?.regularPrice} Tk</p>

                  <button
                    className="px-2 py-1 bg-orange-600 hover:bg-orange-800 duration-200 text-white rounded"
                    ref={buttonRef}
                    onClick={() => handeladdToCart(product)}
                  >
                    add To Cart
                  </button>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProductSaleComp;
