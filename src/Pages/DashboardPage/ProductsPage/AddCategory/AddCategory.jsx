import { useEffect, useState } from "react";
import CreateCategory from "../../../../Components/DashboardComponent/ProductsCompo/CreateCategory";
import CreateSubCategory from "../../../../Components/DashboardComponent/ProductsCompo/CreateSubCategory";
import DeleteCategory from "../../../../Components/DashboardComponent/ProductsCompo/DeleteCategory";

const AddCategory = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  // load all category
  // load all orders
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/category");
        const data = await response.json();
        console.log(data);
        setAllCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [loading]);

  return (
    <div className=" min-h-screen">
      <div className="full-width-all pt-4  pb-24 ">
        <div className="w-full  m-auto  flex gap-8">
          <div className="w-1/2 ">
            <div className=" ">
              <div className=" ">
                <CreateCategory data={{ loading, setLoading }}></CreateCategory>
              </div>
            </div>
            <div className=" ">
              <CreateSubCategory
                data={{ allCategory, setAllCategory, loading, setLoading }}
              ></CreateSubCategory>
            </div>
          </div>

          <DeleteCategory
            data={{ setLoading, allCategory, setAllCategory }}
          ></DeleteCategory>
        </div>
      </div>
    </div>
  );
};
export default AddCategory;
