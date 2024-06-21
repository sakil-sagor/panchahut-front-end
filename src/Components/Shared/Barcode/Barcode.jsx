import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";

const Barcode = ({ product }) => {
  const barcodeRef = useRef(null);
  const [totalBarcode, setTotalBarcode] = useState([]);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, product?.stockId, {
        format: "CODE128",
        displayValue: true,
        fontOptions: "bold",
        textMargin: 0,
        fontSize: 18,
        width: 3, // smaller bar width
        height: 48, // smaller bar height
      });
    }
  }, [product?.stockId]);

  return (
    <div className="">
      <p className="flex justify-center font-bold text-[10px] mb-[-5px]">
        PANCHAHUT
      </p>
      <p className="flex justify-center text-[10px] mb-[-5px]">
        {product?.productName}
      </p>
      <div className="flex justify-center m-0 p-0">
        <svg className="m-0 p-0 h-[48px]" ref={barcodeRef}></svg>
      </div>
      <p className="flex justify-center mt-[-8px] font-bold  ">
        Price: {product?.regularPrice} Tk
      </p>
    </div>
  );
};

export default Barcode;
