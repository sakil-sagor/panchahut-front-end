import React from "react";

const ProductSearchSaleComp = ({ setSearchText }) => {
  return (
    <div>
      <div className="mb-2">
        <label htmlFor=""> Search</label>
        <input
          id="searchProductId"
          placeholder="Write Product ID"
          onChange={(e) => setSearchText(e.target.value)}
          className="border bg-blue-200 border-gray-500 ml-1 rounded p-1"
          type="text"
        />
      </div>
    </div>
  );
};

export default ProductSearchSaleComp;
