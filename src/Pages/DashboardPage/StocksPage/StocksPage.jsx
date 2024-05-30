import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../../../Components/Shared/SideNavbar/TopNavbar";

const StocksPage = () => {
  const routes = [
    { id: 1, path: "/dashboard/stocks/total", name: "Total " },
    { id: 2, path: "/dashboard/stocks/addstocks", name: "Add Stock " },
    { id: 3, path: "/dashboard/stocks/stocksin", name: "Stoct In" },
    { id: 4, path: "/dashboard/stocks/stocksout", name: "Stock Out" },
  ];
  return (
    <div>
      <div>
        <TopNavbar routes={routes}></TopNavbar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default StocksPage;
