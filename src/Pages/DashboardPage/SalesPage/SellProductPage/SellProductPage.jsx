import React, { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import ProductSearchSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/ProductSearchSaleComp";
import SearchProductSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/SearchProductSaleComp";
import SelectedUserForCart from "../../../../Components/DashboardComponent/SalesCompnents/SelectedUserForCart";
import { AuthState } from "../../../../contexts/AuthProvider";
import useButtonPrintP from "../../../../hooks/useButtonPrintP";
import useUserFind from "../../../../hooks/useUserFind";
import { getStoredData } from "../../../../utils/localStorage";

const SellProductPage = () => {
  const { user } = AuthState();
  const { userDetail, setUserDetail, setUserPhone, setUserId } = useUserFind();
  const [selectedUserCart1, setSelectedUserCart1] = useState({});
  const [selectedUserCart2, setSelectedUserCart2] = useState({});
  const [selectedUserCart3, setSelectedUserCart3] = useState({});
  const [guest, setGuest] = useState("guest");
  const [searchText, setSearchText] = useState(0);
  const [searchResult, setSearchResult] = useState({});
  const [addToCart, setAddToCart] = useState([]);
  const [reload, setReload] = useState(0);
  const pathname = location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [lastElement] = pathSegments.slice(-1);
  const buttonRefP = useButtonPrintP();

  // get the search product
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

  // get the product from local storage for cart
  useEffect(() => {
    const result = getStoredData(lastElement);
    setAddToCart(result);
  }, [lastElement, reload]);

  const handelCountQuentity = async (productId, boolean) => {
    // get the product from database
    let newResult;
    const url = `http://localhost:5000/api/v1/product/${productId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      newResult = data?.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    const result = getStoredData(lastElement);
    const plus = result.map((product) => {
      if (product.productId === productId) {
        if (newResult.quantity === product.orderQuentity && boolean) {
          toast.error("Stock is empty,Can not add more.");
        } else {
          let newValue = boolean
            ? product.orderQuentity + 1
            : product.orderQuentity - 1;

          return { ...product, orderQuentity: Math.max(1, newValue) };
        }
      }
      return product;
    });

    localStorage.setItem(lastElement, JSON.stringify(plus));
    setReload(reload + 1);
  };
  // total cart price
  const totalPriceAll = () => {
    const result = getStoredData(lastElement);
    const totalSum = result.reduce((sum, product) => {
      return sum + product.regularPrice * product.orderQuentity;
    }, 0);
    return totalSum;
  };
  // remove from cart list
  const handelRemoveCart = (productId) => {
    const existingProduct = getStoredData(lastElement);
    const result = existingProduct.filter(
      (product) => product.productId !== productId
    );
    localStorage.setItem(lastElement, JSON.stringify(result));
    setReload(reload + 1);
  };

  const handelUserAddtoCart = (userDetail) => {
    if (userDetail?.pathName === "customer1") {
      setSelectedUserCart1(userDetail);
    } else if (userDetail?.pathName === "customer2") {
      setSelectedUserCart2(userDetail);
    } else {
      setSelectedUserCart3(userDetail);
    }

    setUserDetail({});
    const searchInput = document.getElementById("searchProductIdForUserSerach");
    searchInput.value = "";
    setUserPhone("");
  };

  const handelPrinCart = () => {
    const orderdProduct = getStoredData(lastElement);
    console.log(orderdProduct);
  };
  return (
    <div className="p-2">
      <div className=" flex gap-6">
        <div className="flex gap-2">
          <div>
            <ProductSearchSaleComp
              setSearchText={setUserPhone}
              placeHolder="User Phone Number"
              idName="searchProductIdForUserSerach"
            ></ProductSearchSaleComp>
          </div>
        </div>
        {lastElement === userDetail?.pathName && (
          <div>
            {userDetail?.phone && (
              <div>
                <div className="flex gap-4">
                  <p>Id: {userDetail?.userId}</p>
                  <p>name: {userDetail?.fullName}</p>
                  <p>Phone: {userDetail?.phone}</p>
                  <button
                    onClick={() => handelUserAddtoCart(userDetail)}
                    className=" bg-green-600 px-2 text-white rounded hover:bg-green-700 duration-200 hover:text-xl"
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <hr className="my-2" />
      <div className="grid grid-cols-2">
        <div>
          <div>
            <ProductSearchSaleComp
              setSearchText={setSearchText}
              placeHolder="Search Product Id ..."
              idName="searchProductIdForProductSerach"
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
          {addToCart.length > 0 && (
            <div>
              <div className="">
                {selectedUserCart1?.pathName === lastElement && (
                  <SelectedUserForCart
                    selectedUserCart={selectedUserCart1}
                    setSelectedUserCart={setSelectedUserCart1}
                    // handelUserAddtoCart={handelUserAddtoCart}
                  ></SelectedUserForCart>
                )}
                {selectedUserCart2?.pathName === lastElement && (
                  <SelectedUserForCart
                    selectedUserCart={selectedUserCart2}
                    setSelectedUserCart={setSelectedUserCart2}
                    // handelUserAddtoCart={handelUserAddtoCart}
                  ></SelectedUserForCart>
                )}
                {selectedUserCart3?.pathName === lastElement && (
                  <SelectedUserForCart
                    selectedUserCart={selectedUserCart3}
                    setSelectedUserCart={setSelectedUserCart3}
                    // handelUserAddtoCart={handelUserAddtoCart}
                  ></SelectedUserForCart>
                )}
              </div>
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className=" ">
                    <th className="px-4 py-2 ">Id</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {addToCart?.map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-200" : ""}
                    >
                      <td className="px-4 py-2 text-left">
                        {product?.productId}
                      </td>
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
                      <td
                        className="md:px-4 py-2 cursor-pointer  hover:text-red-700"
                        onClick={() => handelRemoveCart(product.productId)}
                      >
                        <RxCross1 />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <hr />
              <div className="mx-6 ">
                <p className="text-right">
                  Total :
                  <span className="mx-2 font-bold text-orange-600">
                    {totalPriceAll()}
                  </span>
                  Tk
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-1/2 bg-sky-700 hover:bg-sky-900 duration-200 text-white rounded-md py-1"
                  ref={buttonRefP}
                  onClick={handelPrinCart}
                >
                  Print Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProductPage;
