import React, { useState } from "react";
import { toast } from "react-toastify";
import blue from "../../../assets/blue.gif";
import useProducts from "../../../hooks/useProducts";

const UpdateStock = ({ product }) => {
  const { setReload, reload } = useProducts();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    costingPrice: "",
    regularPrice: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productData = {
      ...formData,
      productIdNumber: product?.productId,
      productName: product?.productName,
    };
    fetch("https://panchahut-server.vercel.app/api/v1/stocks/create", {
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
          setReload(reload + 1);

          setLoading(false);
        }

        if (data.error) {
          toast.error(" failed");
          setLoading(false);
        }
      });
  };
  return (
    <dialog id={`my_modal_${product?.stockId}`} className="modal  fixed">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn font-bold text-2xl text-red-600">X</button>
          </form>
        </div>

        <div>
          <div className="m-4">
            <form
              className=" border shadow-xl shadow-sky-300 p-2  rounded-md"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between">
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
      </div>
    </dialog>
  );
};

export default UpdateStock;
