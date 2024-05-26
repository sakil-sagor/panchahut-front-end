import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../../../Components/Shared/SideNavbar/TopNavbar";

const SalesPage = () => {
  const routes = [{ id: 1, path: "/dashboard/sales", name: " Sales" }];
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
