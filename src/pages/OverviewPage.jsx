import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OverviewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
  });

  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const generateBarcode = () => {
    setBarcode(formData.productName);
    navigate("/products", {
      state: { barcode: formData.productName, formData },
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex w-[70%] mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
        {/* Form Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Generate Barcode
          </h2>
          <form onSubmit={handleSubmit}>
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
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
              >
                Submit
              </button>
              <button
                type="button" // Change type to button to avoid form submission
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
                onClick={generateBarcode}
              >
                Generate Barcode
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
