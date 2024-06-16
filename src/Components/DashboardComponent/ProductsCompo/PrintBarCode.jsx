import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "../../Shared/Barcode/Barcode";

const PrintBarCode = ({ product }) => {
  const [generateNumber, setGenerateNumber] = useState();
  const [cards, setCards] = useState([]);
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

  const handelSubmitGenerate = (e) => {
    e.preventDefault();

    const newCards = Array(5)
      .fill(null)
      .map((_, index) => (
        <Barcode
          stockId={stockId}
          productIdNumber={productIdNumber}
          regularPrice={regularPrice}
          key={index}
        />
      ));

    setCards(newCards);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <dialog id={`my_modal_${_id}`} className="modal  fixed">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn font-bold text-2xl text-red-600">X</button>
          </form>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div ref={componentRef}>
              <Barcode
                stockId={stockId}
                productIdNumber={productIdNumber}
                regularPrice={regularPrice}
              />
            </div>
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
        <div>
          <div className="grid grid-cols-2  gap-40">{cards}</div>
        </div>
      </div>
    </dialog>
  );
};

export default PrintBarCode;
