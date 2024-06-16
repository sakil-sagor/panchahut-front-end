import React from "react";
import { AiFillEye } from "react-icons/ai";
import PrintBarCode from "./PrintBarCode";
import ProductsDetail from "./ProductsDetail";

const SingleProduct = ({ product, index }) => {
  const {
    _id,
    productIdNumber,
    productName,
    costingPrice,
    discount,
    quantity,
    regularPrice,
  } = product;

  return (
    <tr key={productIdNumber} className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}>
      <td className="px-4 py-2">{productIdNumber}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">{productName}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">{quantity}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">{costingPrice}</td>
      <td className="px-4 py-2 text-blue-700">{discount}</td>
      <td className="px-4 py-2 text-blue-700">{regularPrice}</td>

      <td className="md:px-4 py-2">
        <div
          onClick={() =>
            document.getElementById(`my_modal_${productIdNumber}`).showModal()
          }
          className="cursor-pointer flex gap-1 justify-between bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-sm"
        >
          <div>
            <AiFillEye className="inline m-1"></AiFillEye> <span>View</span>
          </div>
        </div>
        <ProductsDetail product={product}></ProductsDetail>
      </td>
      <td className="md:px-4 py-2">
        <div
          onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
          className="cursor-pointer flex gap-1 justify-between bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
        >
          <div>
            <span>Print</span>
          </div>
        </div>
        <PrintBarCode product={product}></PrintBarCode>
      </td>
    </tr>
  );
};

export default SingleProduct;
