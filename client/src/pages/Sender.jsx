import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../component/ProgressContext";

const Sender = () => {
  const navigate = useNavigate();
  const { updateProgress, updateFormData } = useProgress();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Validate the form inputs
  const validateForm = (formData) => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.product) errors.product = "Product name is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    updateFormData("sender", formData);
    updateProgress("sender");
    navigate("/receiver");
  };

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mt-10 p-4 sm:p-6 md:p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
          Sender Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-xs sm:text-sm font-medium text-white mb-1"
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
              className={`w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-xs sm:text-sm font-medium text-white mb-1"
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
              className={`w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-xs sm:text-sm font-medium text-white mb-1"
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
              className={`w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                errors.product ? "focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter product name"
            />
            {errors.product && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.product}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-xs sm:text-sm font-medium text-white mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                errors.address ? "focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              type="submit"
              className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              <span className="material-icons">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sender;
