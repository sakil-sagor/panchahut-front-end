import { useState } from "react";
import { toast } from "react-toastify";
import blue from "../../../assets/blue.gif";

const CreateCategory = ({ data }) => {
  const { loading, setLoading } = data;
  const [loadingButton, setLoadingButton] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    subCategory: [],
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    setLoading(true);

    // Other registration form submission logic

    fetch("https://panchahut-server.vercel.app/api/v1/category", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("success");
          setFormData({
            category: "",
            subCategory: [],
          });
        }

        if (data.error) {
          toast.error(data.error);
        }
        setLoading(false);
        setLoadingButton(false);
      });
  };

  return (
    <div className=" mt-4 ">
      <form
        className=" border shadow-xl shadow-sky-200 px-2 py-6 md:p-8 rounded-md"
        onSubmit={handleSubmitCategory}
      >
        <div className="flex flex-col w-full">
          <label
            className=" text-gray-600 font-semibold block "
            htmlFor="category"
          >
            Name
          </label>
          <input
            required
            className="py-1 px-2 rounded-md border border-gray-300"
            type="text"
            name="category"
            placeholder="Category Name"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className=" mt-4 ">
          <div className="flex items-center justify-center h-10  bg-sky-700 hover:bg-sky-800 duration-200 rounded">
            <button className=" ">
              <img
                className={`w-8 text-center  mx-auto ${
                  !loadingButton && "hidden"
                }`}
                src={blue}
                alt=""
              />
            </button>
            <button
              className={`w-full h-full  text-white py-18 ${
                loadingButton && "hidden"
              }`}
            >
              <span>Add Category</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
