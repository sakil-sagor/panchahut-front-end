import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../../../contexts/AuthProvider";

const AdminArea = () => {
  const { user } = AuthState();
  const [upPass, setUpPass] = useState(false);
  const handleChange = () => {
    setUpPass(!upPass);
  };
  const date = new Date(user.joining);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-blue-950 mb-6">
        My Profile
      </h2>
      <hr />
      <div className="grid grid-cols-1 lg:grid-cols-6 ">
        <div className="profile-container grid grid-cols-2 gap-2 mt-6  lg:col-span-4">
          <div className="profile-img">
            <div className="">
              <img
                className="w-32 md:w-48 h-32 md:h-48 rounded-full"
                src="https://i.ibb.co/QXP24D1/Education.png"
                alt=""
              />
            </div>
            <div className="mt-6 flex flex-col items-start gap-2">
              <Link to="updateteacher" className="mr-4">
                <button className="btn-primary rounded py-1 px-3">
                  Edit profile
                </button>
              </Link>

              <button
                onClick={handleChange}
                className="btn-primary rounded py-1 px-3"
              >
                Update Password
              </button>
            </div>
          </div>
          <div className="">
            <div className="space-y-2">
              <p>
                <span className="font-bold ">Title:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Full Name: </span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {user.fullName}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Department:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Joining:</span> {day}-{month}-{year}
              </p>
            </div>
          </div>
        </div>
        <div className={`${upPass ? "block" : "hidden"}  mt-8  lg:col-span-2`}>
          <form action="">
            <div className="mb-3">
              <label htmlFor=""> Old Password: </label> <br />
              <input
                className=" w-full lg:w-fit border rounded-md border-black  p-1"
                placeholder="Enter Your old Password"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label htmlFor=""> New Password: </label> <br />
              <input
                className=" w-full lg:w-fit border rounded-md border-black  p-1"
                type="text"
                placeholder="Enter Your New Password"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label htmlFor=""> Re-enter New Password: </label> <br />
              <input
                className=" w-full lg:w-fit border rounded-md border-black  p-1"
                type="text"
                placeholder="Confirm your Password"
                type="text"
              />
            </div>
            <div className="mb-3 text-center lg:text-start">
              <input
                className=" bg-indigo-600 border rounded-md border-black px-5 py-1 text-white"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminArea;
