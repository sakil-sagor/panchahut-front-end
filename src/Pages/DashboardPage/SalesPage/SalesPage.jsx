import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../../../Components/Shared/SideNavbar/TopNavbar";

const SalesPage = () => {
  const routes = [
    { id: 1, path: "/dashboard/sales/customer1", name: "customer1" },
    { id: 2, path: "/dashboard/sales/customer2", name: "customer2" },
    { id: 3, path: "/dashboard/sales/customer3", name: "customer3" },
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

export default SalesPage;
