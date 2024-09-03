import React, { useState, useEffect, useRef } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AnalyticsPage = () => {
  const [trackings, setTrackings] = useState([]);
  const entryRefs = useRef({});

  useEffect(() => {
    fetch("http://localhost:3001/getTrackings")
      .then((response) => response.json())
      .then((data) => setTrackings(data))
      .catch((err) => console.error("Error fetching trackings:", err));
  }, []);

  const handleDownloadPNG = (ref) => {
    if (ref.current) {
      html2canvas(ref.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "barcode.png";
        a.click();
      });
    }
  };

  const handleDownloadPDF = (ref) => {
    if (ref.current) {
      html2canvas(ref.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("barcode.pdf");
      });
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/deleteTracking/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted tracking from the state
          setTrackings((prevTrackings) =>
            prevTrackings.filter((tracking) => tracking._id !== id)
          );
        } else {
          console.error("Failed to delete tracking:", response.statusText);
        }
      })
      .catch((err) => console.error("Error deleting tracking:", err));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-800 p-4 sm:p-6">
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="flex flex-col items-center h-full w-full bg-gray-800 rounded-lg shadow-md">
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Analytics
            </h2>
            {trackings.length > 0 ? (
              <div className="space-y-4">
                {trackings.map((tracking) => {
                  // Create a ref for each tracking
                  entryRefs.current[tracking._id] =
                    entryRefs.current[tracking._id] || React.createRef();

                  // Ensure sender, receiver, and shipment exist
                  const sender = tracking.sender || {};
                  const receiver = tracking.receiver || {};
                  const shipment = tracking.shipment || {};

                  return (
                    <div
                      key={tracking._id}
                      className="p-3 bg-gray-700 rounded-lg"
                    >
                      <div className="transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-out">
                        <p className="text-sm sm:text-base text-white">
                          <strong>Tracking ID:</strong> {tracking.trackingId}
                        </p>
                        <p className="text-sm sm:text-base text-white">
                          <strong>Sender:</strong> {sender.name || "N/A"} (
                          {sender.email || "N/A"})
                        </p>
                        <p className="text-sm sm:text-base text-white">
                          <strong>Receiver:</strong> {receiver.name || "N/A"} (
                          {receiver.email || "N/A"})
                        </p>
                        <p className="text-sm sm:text-base text-white">
                          <strong>Shipment:</strong>{" "}
                          {shipment.shipmentName || "N/A"}
                        </p>
                        <div
                          ref={entryRefs.current[tracking._id]}
                          className="mt-2"
                        >
                          <Barcode value={tracking.trackingId} />
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                          onClick={() =>
                            handleDownloadPNG(entryRefs.current[tracking._id])
                          }
                          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
                        >
                          Download PNG
                        </button>
                        <button
                          onClick={() =>
                            handleDownloadPDF(entryRefs.current[tracking._id])
                          }
                          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base"
                        >
                          Download PDF
                        </button>
                        <button
                          onClick={() => handleDelete(tracking._id)}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white text-center">
                No tracking data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
