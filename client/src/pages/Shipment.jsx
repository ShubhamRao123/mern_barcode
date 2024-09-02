import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../component/ProgressContext";

const Shipment = () => {
  const navigate = useNavigate();
  const { updateProgress, updateFormData } = useProgress();
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
    const formData = {
      shipmentName: e.target.shipmentName.value,
      address: e.target.address.value,
    };

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

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex w-[70%] mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
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
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
