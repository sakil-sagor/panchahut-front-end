import CreateCategory from "../../../../Components/DashboardComponent/ProductsCompo/CreateCategory";
import CreateSubCategory from "../../../../Components/DashboardComponent/ProductsCompo/CreateSubCategory";
import DeleteCategory from "../../../../Components/DashboardComponent/ProductsCompo/DeleteCategory";
import useCategory from "../../../../hooks/useCategory";

const AddCategory = () => {
  // const [allCategory, setAllCategory] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [reload, setReload] = useState(0);

  // // load all category
  // // load all orders
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("https://panchahut-server.vercel.app/api/v1/category");
  //       const data = await response.json();

  //       setAllCategory(data.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, [loading, reload]);
  const {
    allCategory,
    loading,
    setAllCategory,
    setLoading,
    reload,
    setReload,
  } = useCategory();

  return (
    <div className="bg-white ">
      <div className=" pt-4  pb-24 ">
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
            data={{
              setLoading,
              allCategory,
              setAllCategory,
              reload,
              setReload,
            }}
          ></DeleteCategory>
        </div>
      </div>
    </div>
  );
};
export default AddCategory;
