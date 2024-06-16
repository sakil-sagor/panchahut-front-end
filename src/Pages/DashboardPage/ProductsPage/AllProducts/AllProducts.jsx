import { AiFillDatabase } from "react-icons/ai";
import SingleProduct from "../../../../Components/DashboardComponent/ProductsCompo/SingleProduct";
import Loading from "../../../../Components/Shared/Loading/Loading";
import useProducts from "../../../../hooks/useProducts";

const AllProducts = () => {
  const { allProducts, loading } = useProducts();

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
                  Total Result:{allProducts?.result?.length} <span>{""}</span>
                </p>
                <div>
                  <label htmlFor="">Search </label>
                  <input
                    className="border border-gray-400 p-1 bg-blue-50 rounded"
                    type="text"
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
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Costing Price</th>
                    <th className="px-4 py-2"> Discount</th>
                    <th className="px-4 py-2">Selling Price</th>
                    <th className="px-4 py-2">View Product</th>
                    <th className="px-4 py-2">Print</th>
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
      </div>
    </div>
  );
};

export default AllProducts;
