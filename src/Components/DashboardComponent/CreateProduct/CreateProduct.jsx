import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blue from "../../../assets/blue.gif";
import { AuthContext } from "../../../contexts/AuthProvider";

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    productImage: "",
    adminName: user?.fullname,
    brandName: "",
    category: "",
    subcategory: "",
    weight: "",
    weightUnit: "",
    quantity: "",
    costingPrice: "",
    regularPrice: "",
    discount: "",
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
      productImage: imageUrl,
    };
    console.log(productData);
    fetch("http://localhost:5000/api/v1/product/create", {
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
            productName: "",
            description: "",
            productImage: "",
            costingPrice: "",
            discount: "",
            regularPrice: "",
            originName: "",
            brandName: "",
            category: "",
          });
          setLoading(false);
        }

        if (data.error) {
          toast.error(" failed");
          setLoading(false);
        }
      });
  };
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="   pb-24 ">
        <div className="  ">
          <div className="bg-sky-50 ">
            <div className=" ">
              <div className=" m-4 ">
                <form
                  className=" border shadow-xl shadow-blue-300 p-2  rounded-md"
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-end justify-between">
                    <div className=" mt-2">
                      <label className=" text-gray-600 font-semibold  ">
                        User Name
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        value={user?.displayName || user?.email.split("@")[0]}
                      />
                    </div>
                  </div>

                  <div className=" mt-2">
                    <label
                      className=" text-gray-600 font-semibold  "
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                    <input
                      className="py-1 w-full  px-2 rounded-md border border-gray-300"
                      type="text"
                      name="productName"
                      placeholder="Procuts name"
                      value={formData.productName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex  items-center justify-start">
                    <div className=" mt-2 w-1/2">
                      <label
                        className=" text-gray-600 font-semibold block  "
                        htmlFor="image"
                      >
                        Image
                      </label>
                      <input
                        id="image"
                        className="py-1 rounded-md"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {/* Tags input field */}
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="costingPrice"
                      >
                        Costing Price
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        name="costingPrice"
                        placeholder="Costing Price"
                        value={formData.costingPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="regularPrice"
                      >
                        Regular Price
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        name="regularPrice"
                        placeholder="  Regular Price"
                        value={formData.regularPrice}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="discount"
                      >
                        Discount
                      </label>
                      <input
                        className="py-1 block w-full md:w-3/4  px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        max="100"
                        name="discount"
                        placeholder="0-100 % discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                      />
                    </div>

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
                        className=" text-gray-600 font-semibold  "
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="subcategory"
                      >
                        Sub-Category
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="subcategory"
                        placeholder="Sub-Category"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="weight"
                      >
                        Weight
                      </label>
                      <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        name="weight"
                        placeholder="Weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="weightUnit"
                      >
                        Weight Unit
                      </label>
                      <select
                        name="weightUnit"
                        id="weightUnit"
                        className="py-1   px-2 rounded-md border border-gray-300"
                      >
                        <option value="gm">gm</option>
                        <option value="kg">Kg</option>
                        <option value="ml">ml</option>
                        <option value="liter">Liter</option>
                        <option value="pice">Pice</option>
                      </select>
                      {/* <input
                        className="py-1 block  px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        name="weightUnit"
                        placeholder="  Weight Unit"
                        value={formData.weightUnit}
                        onChange={handleInputChange}
                      /> */}
                    </div>

                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="quantity"
                      >
                        Quantity
                      </label>
                      <input
                        className="py-1 block w-full md:w-3/4 px-2 rounded-md border border-gray-300"
                        type="number"
                        min="0"
                        name="quantity"
                        placeholder="0"
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
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
                      required
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
                    <div className="flex items-center justify-center h-10  bg-sky-800 rounded">
                      <button className=" ">
                        <img
                          className={`w-8 text-center  mx-auto ${
                            !loading && "hidden"
                          }`}
                          src={blue}
                          alt=""
                        />
                      </button>
                      <button
                        className={`w-full h-full  text-white py-18 ${
                          loading && "hidden"
                        }`}
                      >
                        <span>Add Product</span>
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