import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OverviewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
  });

  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const barcode = formData.product;

    const userData = { ...formData, barcode };

    axios
      .post("http://localhost:3001/createUser", userData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const generateBarcode = () => {
    setBarcode(formData.product);

    navigate("/products", {
      state: { barcode: formData.product, formData },
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex w-[70%] mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Generate Barcode
          </h2>
          <form onSubmit={handleSubmit}>
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

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
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
