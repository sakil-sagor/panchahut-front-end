import React, { useEffect, useState } from "react";
import ProductSearchSaleComp from "./ProductSearchSaleComp";
import SearchProductSaleComp from "./SearchProductSaleComp";

const SalesAllComponent = () => {
  const [searchText, setSearchText] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    setLoading(true);
    const url = `https://panchahut-server.vercel.app/api/v1/product/${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data.data);
        setLoading(false);
      });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchText]);
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <div>
            <ProductSearchSaleComp
              datas={{ setSearchText, loading, setLoading }}
            ></ProductSearchSaleComp>
          </div>
          {searchResult && (
            <div>
              <SearchProductSaleComp
                searchResult={searchResult}
              ></SearchProductSaleComp>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAllComponent;
