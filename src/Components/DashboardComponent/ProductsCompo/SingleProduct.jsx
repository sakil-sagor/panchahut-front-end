import React, { useState } from "react";

import AddStocks from "../StocksComponents/AddStocks";
import StockDetails from "../StocksComponents/StockDetails";
import ProductsDetail from "./ProductsDetail";
import UpdateProduct from "./UpdateProduct";

const SingleProduct = ({ product, index }) => {
  const {
    _id,
    productId,
    productName,

    weight,
    weightUnit,
    productImage,
  } = product;
  const [reload, setReload] = useState(0);
  return (
    <tr key={productId} className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}>
      <td className="px-4 py-2">
        <img className="w-10" src={productImage} alt="" />
      </td>
      <td className="px-4 py-2">{productId}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">{productName}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">
        {weight} {weightUnit}
      </td>

      <td className="md:px-4 py-2">
        <div
          onClick={() =>
            document.getElementById(`my_modal_${index}`).showModal()
          }
          className="cursor-pointer text-center bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-sm"
        >
          Details
        </div>
        <ProductsDetail product={product} index={index}></ProductsDetail>
      </td>
      <td className="md:px-4 py-2">
        <div
          onClick={() =>
            document.getElementById(`my_modal_${productId}`).showModal()
          }
          className="cursor-pointer text-center bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-sm"
        >
          View Stock
        </div>
        <StockDetails
          product={product}
          setReload={setReload}
          reload={reload}
        ></StockDetails>
      </td>
      <td className="md:px-4 py-2">
        <div
          onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
          className="cursor-pointer text-center bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 text-sm"
        >
          Add_Stock
        </div>
        <AddStocks
          product={product}
          setReload={setReload}
          reload={reload}
        ></AddStocks>
      </td>
      <td className="md:px-4 py-2">
        <div
          onClick={() =>
            document.getElementById(`my_modal_up${_id}`).showModal()
          }
          className="cursor-pointer text-center bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 text-sm"
        >
          Update
        </div>
        <UpdateProduct
          product={product}
          setReload={setReload}
          reload={reload}
        ></UpdateProduct>
      </td>
    </tr>
  );
};

export default SingleProduct;
