import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";

const Barcode = ({ product, weight, weightUnit }) => {
  const barcodeRef = useRef(null);
  const [totalBarcode, setTotalBarcode] = useState([]);
  console.log(product);
  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, product?.stockId, {
        format: "CODE128",
        displayValue: true,
        fontOptions: "bold",
        textMargin: 0,
        fontSize: 18,
        width: 3,
        height: 48,
      });
    }
  }, [product?.stockId]);

  return (
    <div className="">
      <p className="flex justify-center font-bold text-[10px] mb-[-5px]">
        PANCHAHUT
      </p>
      <p className="flex justify-center text-[10px] font-semibold mb-[-4px]">
        {product?.productName} {weight}
        {weightUnit}
      </p>
      <div className="flex justify-center m-0 p-0">
        <svg className="m-0 p-0 h-[48px]" ref={barcodeRef}></svg>
      </div>
      <p className="flex justify-center mt-[-7px] font-bold  ">
        Price: {product?.regularPrice} Tk
      </p>
    </div>
  );
};

export default Barcode;
