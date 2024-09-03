import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../component/ProgressContext";

const Tracking = () => {
  const { formData, updateProgress } = useProgress();
  const [trackingId, setTrackingId] = useState("");
  const [barcodeData, setBarcodeData] = useState("");
  const navigate = useNavigate();

  const generateTrackingId = () => {
    const id = `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setTrackingId(id);
    setBarcodeData(""); // Reset barcode data
    updateProgress("tracking");
  };

  const saveData = () => {
    fetch("http://localhost:3001/createTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: formData.sender?.name || "",
          email: formData.sender?.email || "",
          product: formData.sender?.product || "",
          address: formData.sender?.address || "",
        },
        receiver: {
          name: formData.receiver?.name || "",
          email: formData.receiver?.email || "",
          product: formData.receiver?.product || "",
          address: formData.receiver?.address || "",
        },
        shipment: {
          shipmentName: formData.shipment?.shipmentName || "",
          address: formData.shipment?.address || "",
        },
        trackingId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tracking data saved:", data);
        // Optionally, provide user feedback
      })
      .catch((err) => {
        console.error("Error saving tracking data:", err);
        // Optionally, provide user feedback
      });
  };

  const generateBarcode = () => {
    if (trackingId) {
      setBarcodeData(trackingId);
      // Navigate to the barcode page with the generated barcode data
      navigate("/barcode", { state: { barcodeData: trackingId } });
    } else {
      console.error("No tracking ID generated");
      // Optionally, you can add user feedback here
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <div className="flex flex-col w-full max-w-sm md:max-w-lg lg:max-w-xl mt-10 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="w-full text-white mb-6">
          <h2 className="text-lg md:text-2xl font-bold mb-4">
            Tracking Details
          </h2>

          {/* Sender Details */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105 hover:bg-gray-600">
            <h3 className="text-base md:text-xl font-semibold mb-2">
              Sender Information
            </h3>
            <p>
              <strong>Name:</strong> {formData.sender?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {formData.sender?.email || "N/A"}
            </p>
            <p>
              <strong>Product:</strong> {formData.sender?.product || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.sender?.address || "N/A"}
            </p>
          </div>

          {/* Receiver Details */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105 hover:bg-gray-600">
            <h3 className="text-base md:text-xl font-semibold mb-2">
              Receiver Information
            </h3>
            <p>
              <strong>Name:</strong> {formData.receiver?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {formData.receiver?.email || "N/A"}
            </p>
            <p>
              <strong>Product:</strong> {formData.receiver?.product || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.receiver?.address || "N/A"}
            </p>
          </div>

          {/* Shipment Details */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105 hover:bg-gray-600">
            <h3 className="text-base md:text-xl font-semibold mb-2">
              Shipment Information
            </h3>
            <p>
              <strong>Shipment Name:</strong>{" "}
              {formData.shipment?.shipmentName || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.shipment?.address || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col items-center">
            <button
              type="button"
              onClick={generateTrackingId}
              className="w-[10%] max-w-[150px] px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors mb-4"
            >
              <span className="bold">→</span>
            </button>
            {trackingId && (
              <div className="w-full flex flex-col items-center">
                <p className="mb-4">
                  <strong>Tracking ID:</strong> {trackingId}
                </p>
                <button
                  type="button"
                  onClick={saveData}
                  className="w-full max-w-[150px] px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors mb-4"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={generateBarcode}
                  className="w-full max-w-[150px] px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
                >
                  Generate Barcode
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
