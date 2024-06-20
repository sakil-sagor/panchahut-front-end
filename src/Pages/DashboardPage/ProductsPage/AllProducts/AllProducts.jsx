import { AiFillDatabase } from "react-icons/ai";
import SingleProduct from "../../../../Components/DashboardComponent/ProductsCompo/SingleProduct";
import Loading from "../../../../Components/Shared/Loading/Loading";
import useProducts from "../../../../hooks/useProducts";

const AllProducts = () => {
  const { allProducts, loading, setSearchText, total, count, page, setPage } =
    useProducts();

  return (
    <div className="min-h-[80vh] bg-blue-50 ">
      <div className="container mx-auto px-2">
        <br />

        <div className="w-full max-w-screen-lg mx-auto bg-white  mt-8">
          <div className="overflow-x-auto sm:px-1 md:p-8">
            <div className="py-6">
              <h2 className="text-green-600 font-semibold text-2xl ">
                <AiFillDatabase className="inline mb-1"></AiFillDatabase>
                Products list
              </h2>
              <div className="flex items-center justify-between mt-4 px-2">
                <p>
                  Total Result:{total} <span>{""}</span>
                </p>
                <div>
                  <label htmlFor="">Search </label>
                  <input
                    placeholder="Write Product Name . . ."
                    className="border border-gray-400 p-1 bg-blue-50 rounded"
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr />
            {loading ? (
              <div className="block ">
                <Loading></Loading>
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Weight</th>

                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {allProducts?.result?.map((product, index) => (
                    <SingleProduct
                      key={product._id}
                      index={index}
                      product={product}
                    ></SingleProduct>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className=" ">
          {total ? (
            <>
              <hr className="border-2 border-t-white mt-16" />
              <div className=" mb-16  flex items-center mt-8">
                <p className="text-sky-800 font-semibold mr-3">Total Page :</p>
                <div>
                  {[...Array(count).keys()].map((number) => (
                    <button
                      className={`${
                        page === number ? "bg-sky-700 " : " bg-gray-500"
                      } text-white rounded  mr-4 py-1 px-4`}
                      key={number}
                      onClick={() => setPage(number)}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
