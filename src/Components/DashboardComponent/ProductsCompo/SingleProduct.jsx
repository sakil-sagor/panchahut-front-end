import React from "react";
import { AiFillEye } from "react-icons/ai";
import ProductsDetail from "./ProductsDetail";

const SingleProduct = ({ product, index }) => {
  const { productId, productName, category } = product;
  return (
    <tr key={productId} className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}>
      <td className="px-4 py-2">{productId}</td>
      <td className="px-4 py-2 text-blue-700 font-semibold">{productName}</td>
      <td className="px-4 py-2 text-blue-700">{category}</td>
      <td className="md:px-4 py-2">
        <div
          onClick={() =>
            document.getElementById(`my_modal_${productId}`).showModal()
          }
          className="cursor-pointer flex gap-1 justify-between bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-sm"
        >
          <div>
            <AiFillEye className="inline m-1"></AiFillEye> <span>View</span>
          </div>
        </div>
        <ProductsDetail product={product}></ProductsDetail>
      </td>
    </tr>
  );
};

export default SingleProduct;
