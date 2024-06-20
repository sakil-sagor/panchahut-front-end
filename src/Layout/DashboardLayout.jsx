import { Outlet } from "react-router-dom";
import SideNavbar from "../Components/Shared/SideNavbar/SideNavbar";

const DashboardLayout = () => {
  return (
    <div>
      {/* <Navbar></Navbar> */}

      <div className="mt-4 mb-12 px-2   mx-auto md:min-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
          <div className="  md:col-span-2  shadow-2xl text-center  text-lg  text-sky-900 font-semibold rounded-xl px-2 border">
            <SideNavbar></SideNavbar>
          </div>
          <div className="md:col-span-10  shadow-2xl rounded-xl border bg-sky-50">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
