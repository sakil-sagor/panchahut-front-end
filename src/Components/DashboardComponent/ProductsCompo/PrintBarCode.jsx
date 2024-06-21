import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "../../Shared/Barcode/Barcode";

const PrintBarCode = ({ product, i }) => {
  const componentRef = useRef();
  const {
    _id,
    productIdNumber,
    stockId,
    productName,
    costingPrice,
    discount,
    quantity,
    regularPrice,
  } = product;
  console.log(product);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <dialog id={`my_modal_Bar${stockId}`} className="modal  fixed">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn font-bold text-2xl text-red-600">X</button>
          </form>
        </div>

        <div>
          <div className="grid grid-cols-7 gap-y-4 mt-10" ref={componentRef}>
            {Array.from({ length: quantity }).map((_, index) => (
              <Barcode product={product} />
            ))}
          </div>
        </div>
        <div className="flex justify-end ml-20">
          <button
            className="bg-green-700 px-5 py-1 rounded text-white hover:bg-green-900 duration-200"
            onClick={handlePrint}
          >
            print
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PrintBarCode;
