import React, { useState } from "react";
import { axiosSecure } from "../../../hooks/useAxios";
import { getStoredData } from "../../../utils/localStorage";

const BarcodeScanner = ({ lastElement, reload, setReload, inputRef }) => {
  const [barcode, setBarcode] = useState("");

  const handleScan = (event) => {
    setBarcode(event.target.value);
    if (event.target.value.length >= 6) {
      fetchBarcodeData(event.target.value);
    }
  };
  const fetchBarcodeData = async (barcode) => {
    try {
      const response = await axiosSecure.get(`/sales/barcode/${barcode}`);
      const product = response?.data?.data;

      const cartData = {
        productId: product?.productIdNumber,
        stockId: product?._id,
        productName: product?.product?.productName,
        weight: product?.product?.weight,
        weightUnit: product?.product?.weightUnit,
        regularPrice: product?.regularPrice,
        discount: product?.discount,
        orderQuentity: 1,
      };
      let oldCart = getStoredData(lastElement);
      const productIndex = oldCart.findIndex(
        (product) => product.stockId === cartData?.stockId
      );

      if (productIndex !== -1) {
        oldCart[productIndex].orderQuentity += 1;
        localStorage.setItem(lastElement, JSON.stringify(oldCart));
      } else {
        localStorage.setItem(
          lastElement,
          JSON.stringify([...oldCart, cartData])
        );
      }
    } catch (error) {
      console.error("Error fetching barcode data:", error);
    } finally {
      setReload(reload + 1);
      setBarcode("");
    }
  };

  return (
    <div className="">
      <input
        className="border px-2 py-1 rounded border-gray-800"
        type="text"
        value={barcode}
        onChange={handleScan}
        ref={inputRef}
        placeholder="Scan barcode here"
      />
    </div>
  );
};

export default BarcodeScanner;
