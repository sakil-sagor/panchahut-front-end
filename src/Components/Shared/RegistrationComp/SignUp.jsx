import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ loginArea }) => {
  // const { setLoading } = AuthProvider;
  //   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // setLoading(true);
    if (formData?.phone.length !== 11) {
      toast.error("Incorrect phone number");

      return;
    }
    console.log(formData);
    fetch(" http://localhost:5000/api/v1/user/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          localStorage.setItem("accessToken", result.data.token);
          localStorage.setItem("data", JSON.stringify(result.data.other));
          // setLoading(false);
          //   toast.success("Registration successful");
          //   navigate("/");

          toast.success("User Registration successfully ");
          setTimeout(function () {
            navigate(location?.state ? location.state : "/");
          }, 500);
        }
        if (result.error) {
          toast.error("Registration failed");
          setLoading(false);
        }
      });
  };
  return (
    <div className=" bg-sky-50">
      <div className="">
        <form className="md:flex justify-center" onSubmit={handleSubmit}>
          <div className="md:w-96 px-4  py-8 border-2 rounded-md bg-white shadow-2xl shadow-sky-300">
            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                Name
              </span>
              <input
                placeholder=" Name"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                type="text"
                name="fullName"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                Phone
              </span>
              <input
                placeholder=" Phone"
                type="number"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                name="phone"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                Password
              </span>
              <input
                placeholder="Password"
                type="password"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="block m-auto  text-center">
              <button
                className="p-2 w-full  bg-sky-700 text-white uppercase text-sm rounded-md hover:bg-sky-800"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div>
              <p className=" py-2 mt-2">
                Alreday have an account, Please
                <button
                  onClick={loginArea}
                  className="text-sky-900 py-2 text-lg font-bold"
                  to="/login"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </div>
  );
};

export default SignUp;
