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

  const generateBarcode = () => {
    if (trackingId) {
      setBarcodeData(trackingId);
      // Send tracking data to the backend
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
          navigate("/barcode", { state: { barcodeData: trackingId } });
        })
        .catch((err) => {
          console.error("Error saving tracking data:", err);
          // Optionally, you can add user feedback here
        });
    } else {
      console.error("No tracking ID generated");
      // Optionally, you can add user feedback here
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex w-[70%] mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="w-full text-white">
          <h2 className="text-2xl font-bold mb-4">Tracking Details</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Sender Information</h3>
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
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Receiver Information</h3>
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
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Shipment Information</h3>
            <p>
              <strong>Shipment Name:</strong>{" "}
              {formData.shipment?.shipmentName || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.shipment?.address || "N/A"}
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={generateTrackingId}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
            >
              Generate Tracking ID
            </button>
            {trackingId && (
              <div className="mt-4 text-white">
                <p>
                  <strong>Tracking ID:</strong> {trackingId}
                </p>
                <button
                  type="button"
                  onClick={generateBarcode}
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors mt-4"
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
