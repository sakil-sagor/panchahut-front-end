import React, { useState } from "react";
import Barcode from "./Barcode";

const ProductBarcode = () => {
  const [code, setCode] = useState("12");

  return (
    <div>
      <h1>Product Barcode</h1>
      <Barcode code={code} />
    </div>
  );
};

export default ProductBarcode;
