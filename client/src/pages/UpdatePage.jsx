import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the form data and ID from the state passed from the previous page
  const initialFormData = location.state?.formData || {
    name: "",
    email: "",
    product: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [barcode, setBarcode] = useState(initialFormData.product); // Initialize with the current product for consistency

  // Effect to set barcode initially when product changes
  useEffect(() => {
    setBarcode(formData.product);
  }, [formData.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Form updated:", formData);

    // Update barcode if necessary
    const updatedBarcode = formData.product;
    const updatedData = { ...formData, barcode: updatedBarcode };

    // Send a request to update the user with the new data
    axios
      .put("http://localhost:3001/updateUser", {
        ...updatedData,
        id: location.state?.formData._id,
      })
      .then((result) => {
        console.log(result);
        // Navigate back to the products page with updated data
        navigate("/products", {
          state: { barcode: updatedBarcode, formData: updatedData },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex w-[70%] mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
        {/* Form Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Update Information
          </h2>
          <form onSubmit={handleUpdate}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Product Name Input */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="product"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Update Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
