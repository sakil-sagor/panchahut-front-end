import React from "react";
import { toast } from "react-toastify";

const DeleteCategory = ({ data }) => {
  const { setLoading, allCategory, setAllCategory, reload, setReload } = data;

  const handleRemovecategory = async (id) => {
    setLoading(true);
    if (id) {
      const url = `http://localhost:5000/api/v1/category/${id}`;

      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.deletedCount > 0) {
            toast.success("success");
            const remainingData = allCategory.filter((user) => user._id !== id);
            setAllCategory(remainingData);
          }
        });
    }
    setLoading(false);
  };
  const handleRemoveSubcategory = async (id, name) => {
    if (id) {
      const deletedData = { categoryId: id, subName: name };
      const url = `http://localhost:5000/api/v1/category/deletesubcategory`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(deletedData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.data.status === "success") {
            toast.success("success");
          }
        });
    }
    setReload(reload + 1);
  };
  console.log(allCategory);

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
            <td className="px-4 py-4">
              {cat?.subCategory.map((name, i) => (
                <div key={i} className="flex border-y my-1 border-sky-900 ">
                  <span className="flex-grow"> {name}</span>

                  <button
                    onClick={() => handleRemoveSubcategory(cat?._id, name)}
                    className="bg-red-700 text-white px-1 ml-2 rounded hover:bg-red-800 "
                  >
                    {" "}
                    X
                  </button>
                </div>
              ))}
            </td>

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
