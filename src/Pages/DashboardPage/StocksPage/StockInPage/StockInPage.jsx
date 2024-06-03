import React from "react";
import useAllStockIn from "../../../../hooks/useAllStockIn";

const StockInPage = () => {
  const { allStocksIn } = useAllStockIn();
  console.log(allStocksIn);

  console.log(allStocksIn.createdAt);
  function formatDate(getDate) {
    let date = new Date(getDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      <div>
        {allStocksIn?.map((product) => (
          <div key={product._id}>
            <div className="flex gap-6">
              <p>{formatDate(product?.createdAt)}</p>

              <p>{product?.productIdNumber}</p>
              <p>{product?.quantity}</p>
              <p>{product?.regularPrice}</p>
              <p>{product?.productIdNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockInPage;
