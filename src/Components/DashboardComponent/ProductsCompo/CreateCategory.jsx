import { useState } from "react";
import { toast } from "react-toastify";
import blue from "../../../assets/blue.gif";

const CreateCategory = ({ data }) => {
  const { loading, setLoading } = data;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    // Other registration form submission logic

    fetch("http://localhost:5000/api/v1/category", {
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
      });
  };

  return (
    <div className=" mt-4 ">
      <form
        className=" border shadow-xl shadow-sky-300 px-2 py-6 md:p-8 rounded-md"
        onSubmit={handleSubmit}
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
                className={`w-8 text-center  mx-auto ${!loading && "hidden"}`}
                src={blue}
                alt=""
              />
            </button>
            <button
              className={`w-full h-full  text-white py-18 ${
                loading && "hidden"
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
