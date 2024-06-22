import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blue from "../../../assets/blue.gif";
import { AuthContext } from "../../../contexts/AuthProvider";
import useCategory from "../../../hooks/useCategory";

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { allCategory } = useCategory();
  const [getCategory, setGetCategory] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productNameBangla: "",
    description: "",
    brandName: "",
    subcategory: "",
    weight: "",
    weightUnit: "",
  });

  /////////////////////////

  const handleInputChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImageToImgBB = async (imageFile) => {
    const apiKey = "82ec2763f04d19d197f1451e6935abfe";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + apiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        const imageUrl = data.data.url;
        setImageUrl(imageUrl);
        return imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Other registration form submission logic
    const imageUrl = await uploadImageToImgBB(imageFile);
    const productData = {
      ...formData,
      category: getCategory,
      productImage: imageUrl,
    };

    fetch("https://panchahut-server.vercel.app/api/v1/product/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("success");
          setFormData({
            // productName: "",
            // productNameBangla: "",
            description: "",
            // productImage: "",
            brandName: "",
            category: "",
            subcategory: "",
            weight: "",
            weightUnit: "",
          });
          setGetCategory("");
          setLoading(false);
        }

        if (data.error) {
          toast.error(" failed");
          setLoading(false);
          console.log(data.error);
        }
      });
  };

  // get the sub category
  const subCategoryName = allCategory.find(
    (categoryName) => categoryName.category === getCategory
  );

  return (
    <div className="min-h-screen">
      <div className="   pb-24 ">
        <div className="  ">
          <div className=" ">
            <div className=" ">
              <div className=" m-4 ">
                <form
                  className=" border shadow-xl  p-2  rounded-md"
                  onSubmit={handleSubmit}
                >
                  <div className="flex  items-center justify-between ">
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="productName"
                      >
                        Product Name{" "}
                        <span className="text-red-700 font-bold"> *</span>
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="productName"
                        placeholder="Prodcut name "
                        required
                        value={formData.productName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="productName"
                      >
                        Product Name Bangla
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="productNameBangla"
                        placeholder="Prodcut name bangla"
                        value={formData.productNameBangla}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex  items-center justify-start">
                    <div className=" mt-2 w-1/2">
                      <label
                        className=" text-gray-600 font-semibold block  "
                        htmlFor="image"
                      >
                        Image
                        <span className="text-red-700 font-bold"> *</span>
                      </label>
                      <input
                        id="image"
                        required
                        className="py-1 rounded-md"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="brandName"
                      >
                        Brand Name
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="brandName"
                        placeholder="Brand Name"
                        value={formData.brandName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold block "
                        htmlFor="categoryId"
                      >
                        Category
                      </label>
                      <select
                        className="py-2 px-4  text-lg   rounded-md "
                        name="categoryId"
                        value={formData.category}
                        onChange={(e) => setGetCategory(e.target.value)}
                      >
                        <option className="" value="" disabled selected>
                          -- Select Category --
                        </option>
                        {allCategory?.map((cat) => (
                          <option key={cat?._id} value={cat?.category}>
                            {cat?.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  block"
                        htmlFor="subcategory"
                      >
                        Sub-Category
                      </label>
                      <select
                        className="py-2 px-4  text-lg   rounded-md "
                        name="subcategory"
                        placeholder="Sub-Category"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                      >
                        <option className="" value="" disabled selected>
                          -- Select Sub-Category --
                        </option>
                        {subCategoryName?.subCategory?.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="weight"
                      >
                        Weight
                        <span className="text-red-700 font-bold"> *</span>
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="number"
                        required
                        name="weight"
                        placeholder="Weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  block"
                        htmlFor="weightUnit"
                      >
                        Weight Unit
                        <span className="text-red-700 font-bold"> *</span>
                      </label>
                      <select
                        name="weightUnit"
                        id="weightUnit"
                        required
                        value={formData.weightUnit}
                        onChange={handleInputChange}
                        className="py-1   px-2 rounded-md border border-gray-300"
                      >
                        <option value="" disabled selected>
                          -- Select Weight Unit --
                        </option>
                        <option value="gm">gm</option>
                        <option value="kg">Kg</option>
                        <option value="ml">ml</option>
                        <option value="liter">Liter</option>
                        <option value="pice">Pice</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col w-full mt-2">
                    <label
                      className=" text-gray-600 font-semibold block "
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="py-1 rounded-md  px-2  border border-gray-300"
                      name="description"
                      id="description"
                      placeholder="Description..."
                      cols="30"
                      rows="2"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className=" mt-4 ">
                    <div className="  ">
                      <button
                        className={`flex justify-center items-center mx-auto w-36 h-8 text-white px-4 py-1 bg-sky-700 hover:bg-sky-900 duration-200 rounded `}
                      >
                        {loading ? (
                          <img
                            className={`w-8 h-8 text-center  mx-auto `}
                            src={blue}
                            alt=""
                          />
                        ) : (
                          <span>Create Product</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              theme="colored"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
