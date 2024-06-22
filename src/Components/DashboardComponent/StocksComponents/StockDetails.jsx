import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PrintBarCode from "../ProductsCompo/PrintBarCode";

const StockDetails = ({ product, reload, setReload }) => {
  const [singleStock, setSingleStock] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://panchahut-server.vercel.app/api/v1/stocks/singlestock/${product?.productId}`
        );
        const data = await response.json();

        setSingleStock(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [reload]);

  const handelDeleteStock = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this stock?"
    );

    // If the user did not confirm, exit the function
    if (!userConfirmed) {
      return;
    }
    if (!id) {
      toast.error("Invalid stock ID");
      return;
    }
    const url = `https://panchahut-server.vercel.app/api/v1/stocks/singlestock/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Stock deleted successfully");
      } else {
        toast.error(`Failed to delete stock: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error deleting stock: ${error.message}`);
    } finally {
      setReload((prevReload) => prevReload + 1);
    }
  };

  return (
    <dialog id={`my_modal_${product?.productId}`} className="modal  fixed">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn font-bold text-2xl text-red-600">X</button>
          </form>
        </div>

        <div>
          {singleStock.length < 1 ? (
            <div>
              <p className="text-center font-bold text-2xl ">
                No Stocks Found in this Product.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center font-bold text-2xl text-sky-700 mb-4">
                {product?.productName} {product?.weight}
                {product?.weightUnit}
              </p>

              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">Stock Id</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Weight</th>

                    <th className="px-4 py-2">CP</th>
                    <th className="px-4 py-2">SP</th>
                    <th className="px-4 py-2">Qty</th>

                    <th className="px-4 py-2">Dis</th>
                  </tr>
                </thead>

                <tbody>
                  {singleStock?.map((stock, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#f2f2f2]" : ""}>
                      <td className="px-4 py-2">{stock?.stockId}</td>
                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {stock?.productName}
                      </td>
                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {product?.weight} {product?.weightUnit}
                      </td>

                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {stock?.costingPrice}
                      </td>
                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {stock?.regularPrice}
                      </td>
                      <td className="md:px-4 py-2">{stock?.quantity}</td>
                      <td className="md:px-4 py-2">{stock?.discount}</td>

                      <td className="md:px-4 py-2">
                        <div
                          onClick={() =>
                            document
                              .getElementById(`my_modal_Bar${stock?.stockId}`)
                              .showModal()
                          }
                          className="cursor-pointer flex gap-1 justify-between bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
                        >
                          <div>
                            <span>Barcode</span>
                          </div>
                        </div>
                        <PrintBarCode
                          weight={product?.weight}
                          weightUnit={product?.weightUnit}
                          product={stock}
                        ></PrintBarCode>
                      </td>
                      <td>
                        <div
                          onClick={() => handelDeleteStock(stock?.stockId)}
                          className="md:px-4 py-2 cursor-pointer flex gap-1 justify-between bg-red-700 text-white  rounded hover:bg-red-800 text-sm"
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default StockDetails;
