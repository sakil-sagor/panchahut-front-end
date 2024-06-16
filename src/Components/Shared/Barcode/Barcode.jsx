import JsBarcode from "jsbarcode";
import React, { useEffect, useRef } from "react";

const Barcode = ({ stockId, productIdNumber, regularPrice }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, stockId, {
        format: "CODE128",
        displayValue: false,
        fontOptions: "bold",
        textMargin: 5,
        fontSize: 12,
        width: 2, // smaller bar width
        height: 40, // smaller bar height
      });
    }
  }, [stockId]);

  return (
    <div className="">
      <div className="flex justify-center gap-x-2 font-bold">
        <p> Id: {productIdNumber}</p>
        <p>Price: {regularPrice}</p>
      </div>
      <div className="flex justify-center ">
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default Barcode;
