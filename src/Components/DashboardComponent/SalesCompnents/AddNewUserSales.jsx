import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewUserSales = ({ setUserDetail }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    address: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    if (formData?.phone.length !== 11) {
      toast.error("Incorrect phone number");

      return;
    }

    fetch(" https://panchahut-server.vercel.app/api/v1/user/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setUserDetail(result?.data);
          setFormData({
            fullName: "",
            phone: "",
            password: "",
            address: "",
          });
          toast.success("User Registration successfully ");
        }
        if (result.error) {
          toast.error(result.error);
          setLoading(false);
        }
      });
  };
  return (
    <div className="flex  justify-end">
      <button
        onClick={() => document.getElementById(`my_modal_1`).showModal()}
        className=" cursor-pointer flex gap-1 justify-between bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-sm"
      >
        <div>
          <AiFillEye className="inline m-1"></AiFillEye>{" "}
          <span>Create New User</span>
        </div>
      </button>
      <div>
        <dialog id={`my_modal_1`} className="modal  fixed">
          <div className="modal-box w-11/12 max-w-5xl ">
            <div className="flex justify-end">
              <form method="dialog">
                <button className="btn font-bold text-2xl text-red-600">
                  X
                </button>
              </form>
            </div>
            <div>
              <form className="md:flex justify-center" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-4  gap-6 px-4  py-8 border-2 rounded-md bg-white shadow-2xl shadow-sky-300">
                  <div className="mb-2   ">
                    <span className=" text-gray-600 font-semibold block mb-2 ">
                      Name
                    </span>
                    <input
                      placeholder=" Name"
                      className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                      type="text"
                      name="fullName"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 ">
                    <span className=" text-gray-600 font-semibold block mb-2 ">
                      Phone <span className="text-red-700 font-bold ">*</span>
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
                      email
                    </span>
                    <input
                      placeholder="Email"
                      type="email"
                      className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                      name="email"
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
                      className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                      name="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 col-span-1 md:col-span-4">
                    <span className=" text-gray-600 font-semibold block mb-2 ">
                      Address
                    </span>
                    <input
                      placeholder="Address"
                      type="address"
                      className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                      name="address"
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                  <div className="">
                    <button
                      className="px-12 py-2  bg-sky-700 text-white uppercase text-sm rounded-md hover:bg-sky-800"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AddNewUserSales;
