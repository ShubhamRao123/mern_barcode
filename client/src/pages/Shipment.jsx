import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../component/ProgressContext";

const Shipment = () => {
  const navigate = useNavigate();
  const { updateProgress, updateFormData } = useProgress();
  const [formData, setFormData] = useState({
    shipmentName: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    let errors = {};
    if (!formData.shipmentName)
      errors.shipmentName = "Shipment name is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    updateFormData("shipment", formData);
    updateProgress("shipment");
    navigate("/tracking");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-4 md:p-0">
      <div className="flex flex-col w-full max-w-md mt-10 p-4 bg-gray-800 rounded-lg shadow-md md:max-w-lg lg:max-w-xl">
        <div className="w-full">
          <h2 className="text-lg md:text-2xl font-bold text-white mb-4">
            Shipment Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="shipmentName"
              >
                Shipment Name
              </label>
              <input
                type="text"
                id="shipmentName"
                name="shipmentName"
                value={formData.shipmentName}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                  errors.shipmentName
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="Enter shipment name"
              />
              {errors.shipmentName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shipmentName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-white mb-2"
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
                className={`w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                <span className="ml-2 material-icons">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
