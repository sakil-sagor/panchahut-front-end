import React from "react";

const ProductSearchSaleComp = ({ data }) => {
  const { setSearchText, loading, setLoading } = data;
  return (
    <div>
      <div className="mb-2">
        <label htmlFor=""> Search</label>
        <input
          placeholder="Write Product ID"
          onChange={(e) => setSearchText(e.target.value)}
          className="border bg-blue-200 border-gray-500 ml-1 rounded p-1"
          type="text"
        />
        <button></button>
      </div>
    </div>
  );
};

export default ProductSearchSaleComp;
