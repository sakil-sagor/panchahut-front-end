import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="container mx-auto px-2">
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
