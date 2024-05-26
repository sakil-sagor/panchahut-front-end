import React, { useEffect, useState } from "react";
import ProductSearchSaleComp from "../../../../Components/DashboardComponent/SalesCompnents/ProductSearchSaleComp";

const SellProductPage = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchText);
  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:5000/api/v1/sales/searchsellproduct?search=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data.student);
        setLoading(false);
      });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchText]);

  return (
    <div>
      <div>
        <div>
          <div className="my-2">
            <ProductSearchSaleComp
              data={{ setSearchText, loading, setLoading }}
            ></ProductSearchSaleComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProductPage;
