import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FormData from "../component/FormData";

const ProductPage = () => {
  const location = useLocation();
  const barcodeRef = useRef(null);

  const [statusItems, setStatusItems] = useState([
    { label: "Entry Data", status: "ok" },
    { label: "Fetch Data", status: "ok" },
    { label: "Generate Barcode", status: "ok" },
    { label: "Download Barcode", status: "pending" },
  ]);

  const handleDownloadSVG = () => {
    if (barcodeRef.current) {
      const svg = barcodeRef.current.innerHTML;
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "barcode.svg";
      a.click();
      URL.revokeObjectURL(url);

      // Update status
      setStatusItems((prevStatusItems) =>
        prevStatusItems.map((item) =>
          item.label === "Download Barcode" ? { ...item, status: "ok" } : item
        )
      );
    }
  };

  const handleDownloadPDF = () => {
    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("barcode.pdf");

        // Update status
        setStatusItems((prevStatusItems) =>
          prevStatusItems.map((item) =>
            item.label === "Download Barcode" ? { ...item, status: "ok" } : item
          )
        );
      });
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-800">
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center h-full w-full p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">
            Barcode Description
          </h2>
          <FormData />
          <h2 className="text-2xl font-bold text-white mb-4">
            Product Barcode
          </h2>
          {barcode ? (
            <div className="mt-10">
              <div ref={barcodeRef}>
                <Barcode value={barcode} />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleDownloadSVG}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download SVG
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ) : (
            <p className="text-white">No barcode available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
