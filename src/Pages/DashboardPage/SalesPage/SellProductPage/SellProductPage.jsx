import React, { useEffect, useRef, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import AddNewUserSales from "../../../../Components/DashboardComponent/SalesCompnents/AddNewUserSales";
import ProductSearchSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/ProductSearchSaleComp";
import SearchProductSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/SearchProductSaleComp";
import SelectedUserForCart from "../../../../Components/DashboardComponent/SalesCompnents/SelectedUserForCart";

import BarcodeScanner from "../../../../Components/Shared/Barcode/BarcodeScanner ";
import blue from "../../../../assets/blue.gif";
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
  const [less, setLess] = useState(0);
  const [receiveTk, seReceiveTk] = useState(0);
  const [discountBox, setDiscountBox] = useState(false);
  const [searchText, setSearchText] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [reload, setReload] = useState(0);
  const pathname = location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [lastElement] = pathSegments.slice(-1);
  const { buttonRefCtrlEnter, buttonRefPlus } = useButtonPrintP();
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const inputRef = useRef(null);

  // get the search product
  useEffect(() => {
    if (searchText) {
      const url = `https://panchahut-server.vercel.app/api/v1/sales/${searchText}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setSearchResult(data?.data);
        });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchText]);

  // get the product from local storage for cart
  useEffect(() => {
    const result = getStoredData(lastElement);
    setAddToCart(result);
  }, [lastElement, reload]);

  const handelCountQuentity = async (stockId, boolean) => {
    // get the product from database

    let newResult;
    const url = `https://panchahut-server.vercel.app/api/v1/sales/salesforcountincart/${stockId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      newResult = data?.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    const result = getStoredData(lastElement);
    const plus = result.map((product) => {
      if (product.stockId === stockId) {
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
  const handelRemoveCart = (stockId) => {
    const existingProduct = getStoredData(lastElement);
    const result = existingProduct.filter(
      (product) => product.stockId !== stockId
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

  const handelLessTk = (boolean) => {
    if (boolean) {
      setDiscountBox(false);
      setLess(0);
    } else {
      setDiscountBox(true);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handelPrinCart = () => {
    if (!receiveTk) {
      toast.warning("Please Take Receive Amount");
      return;
    }
    setLoading(true);
    const orderdProduct = getStoredData(lastElement);
    if (orderdProduct.length <= 0) {
      toast.warning("Please add item in cart..");
      return;
    }

    let customerId;
    let customerPhone;

    if (lastElement === "customer1") {
      customerId = selectedUserCart1.userId;
      customerPhone = selectedUserCart1.phone;
    } else if (lastElement === "customer2") {
      customerPhone = selectedUserCart2.phone;
      customerId = userDetail.userId;
    } else if (lastElement === "customer3") {
      customerPhone = selectedUserCart3.phone;
      customerId = userDetail.userId;
    }

    const totalOrder = {
      manager: user?.userId,
      totelPirice: totalPriceAll() - less,
      orderdProduct,
      phone: customerPhone ? customerPhone : "012345678912",
      userId: customerId ? customerId : 1000,
      less: less,
    };
    setLoading(true);

    fetch("https://panchahut-server.vercel.app/api/v1/stocks/stockout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(totalOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("success");
          setLess(0);
          setDiscountBox(false);
          localStorage.setItem(lastElement, JSON.stringify([]));
          setReload(reload + 1);
          setLoading(false);
          handlePrint();
          seReceiveTk(0);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }

        if (data.error) {
          toast.error(data.error);
          setLoading(false);
        }
      });
  };
  return (
    <div className="p-2">
      <div className=" grid grid-cols-2 md:grid-cols-3  gap-6">
        <div className="flex gap-2">
          <div>
            <ProductSearchSaleComp
              setSearchText={setUserPhone}
              buttonRefPlus={buttonRefPlus}
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
                    ref={buttonRefPlus}
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
        <div>
          <AddNewUserSales setUserDetail={setUserDetail}></AddNewUserSales>
        </div>
      </div>
      <hr className="my-2" />
      <div className="grid grid-cols-2">
        <div>
          <div className="flex justify-start gap-6 items-center mb-4">
            <div>
              <ProductSearchSaleComp
                setSearchText={setSearchText}
                placeHolder="Search Product Id ..."
                idName="searchProductIdForProductSerach"
              ></ProductSearchSaleComp>
            </div>
            <div>
              <BarcodeScanner
                setReload={setReload}
                lastElement={lastElement}
                reload={reload}
                inputRef={inputRef}
              ></BarcodeScanner>
            </div>
          </div>
          <div>
            <div></div>
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
        <div>
          <div className="" ref={componentRef}>
            <div>
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
              </div>
              <div>
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
                  {addToCart.length > 0 && (
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
                                  handelCountQuentity(product?.stockId, true)
                                }
                                className="text-4xl text-gray-500 cursor-pointer hover:text-gray-700"
                              />

                              <span className="font-bold">
                                {product.orderQuentity}
                              </span>
                              <CiSquareMinus
                                onClick={() =>
                                  handelCountQuentity(product?.stockId, false)
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
                            onClick={() => handelRemoveCart(product.stockId)}
                          >
                            <RxCross1 />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
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
              <div className="flex justify-between ">
                <div>
                  <input
                    type="checkbox"
                    name="discountBox"
                    id="discountBox"
                    onChange={() => handelLessTk(discountBox)}
                  />
                  <label htmlFor="discountBox"> Discount </label>
                </div>

                {discountBox ? (
                  <div className=" flex justify-end">
                    <input
                      className="w-1/2 text-right border border-gray-600 "
                      type="number"
                      onChange={(e) => setLess(e.target.value)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <br />
              <hr />
              <div className="mx-6 ">
                <p className="text-right">
                  Total Amount:
                  <span className="mx-2 font-bold text-orange-600">
                    {totalPriceAll() - less}
                  </span>
                  Tk
                </p>
              </div>
              <div className=" flex justify-between">
                <p>Receive Amount </p>
                <div className="text-right">
                  <input
                    className="w-full  text-right border border-gray-600 "
                    type="number"
                    min="0"
                    value={receiveTk}
                    onChange={(e) => seReceiveTk(e.target.value)}
                  />
                </div>
              </div>
              <div className="mx-6 ">
                <p className="text-right">
                  Return Amount:
                  <span className="mx-2 ">
                    {receiveTk - totalPriceAll() - less}
                  </span>
                  Tk
                </p>
              </div>
            </div>
          </div>
          {/* {addToCart.length > 0 && ( */}
          <div className="flex justify-center ">
            <div
              className="w-1/2 mt-2 flex items-center justify-center h-10  bg-sky-700 hover:bg-sky-800 rounded disabled"
              ref={buttonRefCtrlEnter}
              onClick={!loading && handelPrinCart}
            >
              <button className=" ">
                <img
                  className={`w-8 text-center  mx-auto ${!loading && "hidden"}`}
                  src={blue}
                  alt=""
                />
              </button>
              <button
                className={`w-full h-full  text-white py-18 ${
                  loading && "hidden"
                }`}
              >
                <span> Print Order</span>
              </button>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default SellProductPage;
