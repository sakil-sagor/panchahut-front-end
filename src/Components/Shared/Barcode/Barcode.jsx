import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";

const Barcode = ({ stockId, productIdNumber, regularPrice }) => {
  const barcodeRef = useRef(null);
  const [totalBarcode, setTotalBarcode] = useState([]);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, stockId, {
        format: "CODE128",
        displayValue: true,
        fontOptions: "bold",
        textMargin: 0,
        fontSize: 16,
        width: 2, // smaller bar width
        height: 40, // smaller bar height
      });
    }
  }, [stockId]);

  return (
    <div className="">
      <p className="flex justify-center m-[-15px] text-sm   ">
        Price: {regularPrice} Tk
      </p>

      <div className="flex justify-center m-0">
        <svg className="" ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default Barcode;
