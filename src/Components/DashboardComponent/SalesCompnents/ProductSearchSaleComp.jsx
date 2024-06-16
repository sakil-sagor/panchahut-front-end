import React from "react";

const ProductSearchSaleComp = ({ setSearchText, placeHolder, idName }) => {
  return (
    <div>
      <div className="">
        <input
          id={idName}
          placeholder={placeHolder}
          onChange={(e) => setSearchText(e.target.value)}
          className="border bg-blue border-gray-500 ml-1 rounded p-1"
          type="text"
        />
      </div>
    </div>
  );
};

export default ProductSearchSaleComp;
