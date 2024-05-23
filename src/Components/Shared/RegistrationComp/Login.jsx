import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blue from "../../../assets/blue.gif";
import { AuthState } from "../../../contexts/AuthProvider";

const Login = () => {
  const { setLoading } = AuthState();
  const [phone, setPhone] = useState("");
  const [loginflow, setLoginflow] = useState(false);
  const [password, setPassword] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";
  // const from = "/dashboard";
  const data = {
    phone: phone,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        data,
        {
          withCredentials: true,
        }
      );
      2;
      // Assuming you want to log the response data
      console.log(response.data);
      console.log(response.data.success);

      if (response.data.success) {
        localStorage.setItem("data", JSON.stringify(response.data.userData));
        toast.success("Login successful");
        setLoading(false);
        setTimeout(() => {
          navigate(from, { replace: true });
          setLoginflow(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" bg-sky-50">
      <div className="">
        <form className="md:flex justify-center md:m-0" onSubmit={handleLogin}>
          <div className="md:w-96 px-4 py-8  bg-white rounded-md shadow-2xl shadow-sky-300">
            <div className="mb-3 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                Phone
              </span>
              <input
                placeholder=" Your Phone Number "
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md "
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3 ">
              <span className=" text-gray-600 font-semibold block mb-2">
                Password
              </span>
              <input
                placeholder="Password"
                type="password"
                required
                className="p-2 w-full   bg-white border border-gray-400 rounded-md "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            <div className="  ">
              <div className="flex items-center justify-center h-10  bg-sky-700 rounded">
                <button className=" ">
                  <img
                    className={`w-8 text-center  mx-auto ${
                      !loginflow && "hidden"
                    }`}
                    src={blue}
                    alt=""
                  />
                </button>
                <button
                  className={`w-full h-full  text-white py-18 ${
                    loginflow && "hidden"
                  }`}
                >
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </div>
  );
};

export default Login;
