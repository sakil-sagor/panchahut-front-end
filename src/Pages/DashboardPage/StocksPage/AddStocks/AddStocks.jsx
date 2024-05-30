import React, { useState } from "react";
import { toast } from "react-toastify";
import ProductSearchSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/ProductSearchSaleComp";
import blue from "../../../../assets/blue.gif";
import useSearchProductById from "../../../../hooks/useSearchProductById";

const AddStocks = () => {
  const [getProduct, setGetProduct] = useState({});
  const {
    searchText,
    setSearchText,
    searchResult,
    setSearchResult,
    reload,
    setReload,
    loading,
    setLoading,
  } = useSearchProductById();
  const [formData, setFormData] = useState({
    costingPrice: "",
    regularPrice: "",
    quantity: "",
  });

  /////////////////////////

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productData = { ...formData, productIdNumber: getProduct.productId };
    fetch("http://localhost:5000/api/v1/stocks/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("success");
          setFormData({
            costingPrice: "",
            regularPrice: "",

            quantity: "",
          });
          setSearchText("");
          setLoading(false);
        }

        if (data.error) {
          toast.error(" failed");
          setLoading(false);
          console.log(data.error);
        }
      });
  };

  return (
    <div>
      <div className="grid grid-cols-2  items-center">
        <div>
          <ProductSearchSaleComp
            setSearchText={setSearchText}
            placeHolder="Search Product Id ..."
            idName="searchProductIdForProductSerach"
          ></ProductSearchSaleComp>
        </div>

        <div className="">
          <div className="border shadow-md p-2">
            <div>
              <div className="flex justify-between items-center">
                <div className="max-w-16 max-h-16">
                  <img
                    className="rounded-md"
                    src={searchResult?.productImage}
                    alt=""
                  />
                </div>
                <p>{searchResult?.productName}</p>
                <p>{searchResult?.regularPrice}Tk</p>

                <button
                  className="px-2 py-1 bg-orange-600 hover:bg-orange-800 duration-200 text-white rounded"
                  onClick={() => setGetProduct(searchResult)}
                >
                  add To Cart
                </button>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <form
          className=" border shadow-xl shadow-sky-300 p-2  rounded-md"
          onSubmit={handleSubmit}
        >
          <div>
            <div className=" grid grid-cols-2 items-center gap-6">
              <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="productIdNumber"
                >
                  Product Id
                </label>
                <input
                  className="py-1 w-full  px-2 rounded-md border border-gray-300"
                  type="number"
                  name="productIdNumber"
                  placeholder="Prodcut Id "
                  value={getProduct.productId}
                />
              </div>
              <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  className="py-1 w-full  px-2 rounded-md border border-gray-300"
                  type="text"
                  name="productName"
                  placeholder="Prodcut name "
                  value={getProduct.productName}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between">
              <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="costingPrice"
                >
                  Costing Price
                </label>
                <input
                  className="py-1 block  px-2 rounded-md border border-gray-300"
                  type="number"
                  min="0"
                  name="costingPrice"
                  placeholder="Costing Price"
                  value={formData.costingPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="regularPrice"
                >
                  Regular Price
                </label>
                <input
                  className="py-1 block  px-2 rounded-md border border-gray-300"
                  type="number"
                  min="0"
                  name="regularPrice"
                  placeholder="  Regular Price"
                  value={formData.regularPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  className="py-1 block  px-2 rounded-md border border-gray-300"
                  type="number"
                  min="0"
                  name="quantity"
                  placeholder="  quantity "
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>

              {/* <div className=" mt-2">
                <label
                  className=" text-gray-600 font-semibold  "
                  htmlFor="discount"
                >
                  Discount
                </label>
                <input
                  className="py-1 block w-full md:w-3/4  px-2 rounded-md border border-gray-300"
                  type="number"
                  min="0"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>
            <div className=" mt-4 ">
              <div className="flex items-center justify-center h-10  bg-green-600 rounded">
                <button className=" ">
                  <img
                    className={`w-8 text-center  mx-auto ${
                      !loading && "hidden"
                    }`}
                    src={blue}
                    alt=""
                  />
                </button>
                <button
                  className={`w-full h-full  text-white py-18 ${
                    loading && "hidden"
                  }`}
                >
                  <span>Add Product in Stock</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStocks;
