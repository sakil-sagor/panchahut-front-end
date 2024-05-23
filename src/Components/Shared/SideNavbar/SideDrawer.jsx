import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../assets/pro1.png";

function SideDrawer({ isOpen, onClose, children }) {
  const { teacher, logout } = TeacherState();

  const navigate = useNavigate();
  const drawerClasses = isOpen ? "side-drawer open" : "side-drawer";
  // log out button
  const handleLogOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className={drawerClasses}>
      <div className="">
        <button
          onClick={onClose}
          className="close-btn text-white bg-red-800 px-1 mt-2 mr-2 w-10 rounded text-4xl"
        >
          X
        </button>
        {/* <div className="drawer-content">{children}</div> */}
        <div className="drawer-content menu ">
          <div className="my-6">
            <img
              className="w-16 rounded-full block mx-auto"
              src={profileImage}
              alt=""
            />
            <p className=" text-white  mt-4">{admin.adminName}</p>
          </div>
          <hr className="mb-6" />
          <div>
            <Link
              onClick={onClose}
              className=" block py-2 text-sm mb-4 border mx-10 hover:bg-sky-900 text-white rounded"
              to="/dashboard"
            >
              View Profile
            </Link>
          </div>
          <div>
            <Link
              onClick={onClose}
              className=" block py-2 text-sm mb-4 border mx-10 hover:bg-sky-900 text-white rounded"
              to="/dashboard/makePayment"
            >
              Make Payment
            </Link>
          </div>

          {admin.adminPhone && (
            <>
              <div>
                <Link
                  onClick={onClose}
                  className="block py-2 text-sm mb-4 border mx-10 hover:bg-sky-900 text-white rounded"
                  to="/dashboard/allStudent"
                >
                  All Students
                </Link>
              </div>
            </>
          )}

          {
            <div className="mt-24">
              <button
                className=" px-6 py-2 border  text-white bg-pink-800 hover:bg-pink-700 rounded"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default SideDrawer;
