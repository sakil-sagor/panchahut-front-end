import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../../assets/pro1.png";
import { AuthState } from "../../../contexts/AuthProvider";

const SideNavbar = () => {
  const { user, logout } = AuthState();

  const navigate = useNavigate();
  // log out button
  const handleLogOut = () => {
    logout();
    navigate("/login", { replace: true });
    // setLoading(false)
  };

  return (
    <div className="">
      <div className=" px-2  mx-auto md:min-h-screen text-sm">
        <div className="rawer-content menu text-black font-semibold">
          <div className="mb-6">
            <img
              className="w-20 rounded-full block mx-auto"
              src={profileImage}
              alt=""
            />
            <p className="text-2xl mt-4">{user?.fullName}</p>
          </div>
          <hr className="mb-6" />
          <div>
            <Link
              className=" block py-1 border mb-3 hover:bg-sky-900 hover:text-white rounded-lg"
              to="/dashboard"
            >
              View Profile
            </Link>
          </div>
          <div>
            <Link
              className=" block py-1 border mb-3 hover:bg-sky-900 hover:text-white rounded-lg"
              to="/dashboard/products"
            >
              products
            </Link>
          </div>
          <div>
            <Link
              className=" block py-1 border mb-3 hover:bg-sky-900 hover:text-white rounded-lg"
              to="/dashboard/sales"
            >
              Sales
            </Link>
          </div>

          <div>
            <Link
              className=" block py-1 border mb-3 hover:bg-sky-900 hover:text-white rounded-lg"
              to="/dashboard/stocks"
            >
              Stocks
            </Link>
          </div>

          {
            <div className="mt-24">
              <button
                className=" px-6 py-1 text-white bg-pink-800 hover:bg-pink-700 rounded"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
