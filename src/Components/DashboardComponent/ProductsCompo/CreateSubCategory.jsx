import { useState } from "react";
import { toast } from "react-toastify";
import blue from "../../../assets/blue.gif";

const CreateSubCategory = ({ data }) => {
  const { allCategory, setAllCategory, loading, setLoading } = data;
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
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

    // Other registration form submission logic

    fetch("http://localhost:5000/api/v1/category/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("success");
          setFormData({
            category: "",
            subCategory: "",
          });
        }

        setLoading(false);
        if (data.error) {
          setFormData({
            category: "",
            subCategory: "",
          });

          toast.error(" failed");
        }
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

          <select
            required
            className="py-2 px-4 w-full text-lg  required rounded-md "
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Category{" "}
            </option>
            <option value="saree"> saree</option>
            <option value="lungi"> lungi</option>
            <option value="shawl">shawl</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label
            className=" text-gray-600 font-semibold block "
            htmlFor="subCategory"
          >
            Name
          </label>
          <input
            required
            className="py-1 px-2 rounded-md border border-gray-300"
            type="text"
            name="subCategory"
            placeholder="Sub-Category Name"
            value={formData.subCategory}
            onChange={handleInputChange}
          />
        </div>

        <div className=" mt-4 ">
          <div className="flex items-center justify-center h-10  bg-sky-700 rounded">
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

export default CreateSubCategory;
