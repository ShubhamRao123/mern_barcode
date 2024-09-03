import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BarcodePage = () => {
  const location = useLocation();
  const barcodeData = location.state?.barcodeData || ""; // Retrieve barcode data from state
  const barcodeRef = useRef(null); // Reference to barcode container

  const generateBase64Barcode = async () => {
    if (barcodeRef.current) {
      const canvas = await html2canvas(barcodeRef.current);
      return canvas.toDataURL("image/png").split(",")[1]; // Get base64 part of data URL
    }
    return "";
  };

  const handleDownloadPNG = async () => {
    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "barcode.png";
        a.click();
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("barcode.pdf");
      });
    }
  };

  const handleSaveBarcode = async () => {
    const base64Barcode = await generateBase64Barcode();
    if (base64Barcode) {
      fetch("http://localhost:3001/createTracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            /* sender data */
          },
          receiver: {
            /* receiver data */
          },
          shipment: {
            /* shipment data */
          },
          trackingId: barcodeData, // Assuming barcodeData is your tracking ID
          barcode: base64Barcode,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Tracking data saved:", data))
        .catch((err) => console.error("Error saving tracking data:", err));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6 sm:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mt-10 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="w-full text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Barcode
          </h2>
          <div ref={barcodeRef} className="mb-4 flex justify-center">
            {barcodeData ? (
              <Barcode
                value={barcodeData}
                format="CODE128"
                displayValue={true}
                width={2}
                height={50}
                background="#ffffff"
                lineColor="#000000"
              />
            ) : (
              <div className="text-center">No Barcode to display</div>
            )}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <button
              onClick={handleDownloadPNG}
              className="w-full sm:w-auto max-w-xs px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto max-w-xs px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
            {/* Uncomment if you want to use the save functionality */}
            {/* <button
              onClick={handleSaveBarcode}
              className="w-full sm:w-auto max-w-xs px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
            >
              Save and Generate Barcode
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodePage;
