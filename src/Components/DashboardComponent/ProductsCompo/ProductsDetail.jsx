import React from "react";

const ProductsDetail = ({ product }) => {
  const {
    productIdNumber,
    productName,
    productNameBangla,
    description,
    brandName,
    category,
    subcategory,
    costingPrice,
    discount,
    regularPrice,
    productImage,
    adminName,
    weight,
    weightUnit,
    quantity,
    featured,
  } = product;

  return (
    <dialog id={`my_modal_${productIdNumber}`} className="modal  fixed">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn font-bold text-2xl text-red-600">X</button>
          </form>
        </div>
        <div className="grid grid-cols-12  ">
          <div className="col-span-12 md:col-span-3 lg:col-span-2 ">
            <img
              className="rounded-full w-32 h-32  "
              src={productImage}
              alt=""
            />
          </div>
          <div className="pb-8 col-span-12  md:col-span-9 lg:col-span-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span>{`${productName}  ${productNameBangla}` || "N/A"}</span>
              </div>

              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">Brand Name</span>
                <span>: {brandName || "N/A"}</span>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span className="w-24">category</span>
                <span>: {category || "N/A"}</span>
              </div>
              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">subcategory</span>
                <span>: {subcategory || "N/A"}</span>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span className="w-24">adminName</span>
                <span>: {adminName || "N/A"}</span>
              </div>
              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">featured</span>
                <span>: {featured || "N/A"}</span>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span className="w-24">costingPrice</span>
                <span>: {costingPrice || "N/A"} Tk</span>
              </div>
              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">RegularPrice</span>
                <span>: {regularPrice || "N/A"} Tk</span>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span className="w-24">Discount </span>
                <span>: {discount || "N/A"} Tk</span>
              </div>
              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">Discount Price</span>
                <span>: {regularPrice - discount || "N/A"}</span>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 my-2 ">
              <div className="flex items-center">
                <span className="w-24">weight</span>
                <span>
                  : {weight || "N/A"} {weightUnit}
                </span>
              </div>
              <hr className="md:hidden my-2" />
              <div className="flex items-center">
                <span className="w-24">quantity</span>
                <span>: {quantity || "N/A"}</span>
              </div>
            </div>
            <hr />
            <div className="my-2 ">
              <div className="flex items-center">
                <span className="w-24">description</span>
                <span>: {description || "N/A"}</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProductsDetail;
