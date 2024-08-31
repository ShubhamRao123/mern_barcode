import React from "react";
import { useLocation } from "react-router-dom";

function FormData() {
  const location = useLocation();
  const { formData } = location.state || {}; // Retrieve formData from state

  if (!formData) {
    return <div>No form data available</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Form Data</h2>
      <div>
        <p className="mb-2">
          <strong>Name:</strong> {formData.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Product Name:</strong> {formData.productName}
        </p>
      </div>
    </div>
  );
}

export default FormData;
