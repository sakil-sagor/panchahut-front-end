import { useState } from "react";
import { toast } from "react-toastify";
import blue from "../../../assets/blue.gif";

const CreateSubCategory = ({ data }) => {
  const { allCategory, setAllCategory, loading, setLoading } = data;
  const [loadingButton, setLoadingButton] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
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
    setLoadingButton(true);

    // Other registration form submission logic

    fetch("http://localhost:5000/api/v1/category/createsubcategory", {
      method: "PUT",
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
            subCategory: "",
          });
        }

        if (data.error) {
          setFormData({
            subCategory: "",
          });

          toast.error(" failed");
        }
        setLoading(false);
        setLoadingButton(false);
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
            htmlFor="categoryId"
          >
            Name
          </label>
          <select
            required
            className="py-2 px-4 w-full text-lg  required rounded-md "
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Category
            </option>
            {allCategory?.map((cat) => (
              <option key={cat?._id} value={cat?._id}>
                {" "}
                {cat?.category}
              </option>
            ))}
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
            id="subCategoryName"
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

export default CreateSubCategory;
