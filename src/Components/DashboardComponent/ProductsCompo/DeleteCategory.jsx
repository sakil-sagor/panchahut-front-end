import React from "react";
import { toast } from "react-toastify";

const DeleteCategory = ({ data }) => {
  const { setLoading, allCategory, setAllCategory } = data;

  const handleRemovecategory = async (id) => {
    setLoading(true);
    if (id) {
      const url = `http://localhost:5000/api/v1/category/${id}`;

      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (data.data.deletedCount > 0) {
            toast.success("success");
            const remainingData = allCategory.filter((user) => user._id !== id);
            setAllCategory(remainingData);
          }
        });
    }
    setLoading(false);
  };

  return (
    <div className="w-1/2 ">
      <table className="w-full table-auto border border-spacing-y-6">
        <thead className="">
          <tr className="text-left border">
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sub Category</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        {allCategory?.map((cat, index) => (
          <tr key={cat.id} className={index % 2 === 0 ? "bg-gray-200 " : ""}>
            <td className="px-4 py-4  text-sky-700 ">{cat.category}</td>
            <td className="px-4 py-4">{cat?.subCategory}</td>
            <td className="px-4 py-4">
              <button
                onClick={() => handleRemovecategory(cat?._id)}
                className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800 "
              >
                {" "}
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DeleteCategory;
