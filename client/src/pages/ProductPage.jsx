// import React, { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Barcode from "react-barcode";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const ProductPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const barcodeRef = useRef(null);
//   const [barcode, setBarcode] = useState(location.state?.barcode || "");
//   const [formData, setFormData] = useState(location.state?.formData || {});
//   const [entries, setEntries] = useState([]);

//   // Fetch all entries from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/getUsers")
//       .then((response) => setEntries(response.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleDownloadPNG = (ref) => {
//     if (ref.current) {
//       html2canvas(ref.current).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const a = document.createElement("a");
//         a.href = imgData;
//         a.download = "barcode.png";
//         a.click();
//       });
//     }
//   };

//   const handleDownloadPDF = (ref) => {
//     if (ref.current) {
//       html2canvas(ref.current).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, "PNG", 10, 10);
//         pdf.save("barcode.pdf");
//       });
//     }
//   };

//   const handleUpdate = (entry) => {
//     navigate("/update", { state: { formData: entry } });
//   };

//   const handleUpdateProduct = () => {
//     navigate("/update", { state: { formData: formData } });
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3001/deleteUser/${id}`)
//       .then(() => {
//         setEntries(entries.filter((entry) => entry._id !== id));
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="flex flex-col h-screen w-full bg-gray-800">
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="flex flex-col items-center h-full w-full p-6 bg-gray-800 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Barcode Description
//           </h2>

//           {/* Display current form data */}
//           <div className="text-white mb-4">
//             <p>
//               <strong>Name:</strong> {formData.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {formData.email}
//             </p>
//             <p>
//               <strong>Product Name:</strong> {formData.product}
//             </p>
//           </div>

//           {/* Barcode display and update button */}
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Product Barcode
//           </h2>
//           {barcode ? (
//             <div className="mt-2">
//               <div ref={barcodeRef}>
//                 <Barcode value={barcode} />
//               </div>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleDownloadPNG(barcodeRef)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Download PNG
//                 </button>
//                 <button
//                   onClick={() => handleDownloadPDF(barcodeRef)}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Download PDF
//                 </button>
//                 <button
//                   onClick={handleUpdateProduct}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Update
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p className="text-white">No barcode available</p>
//           )}

//           {/* Display all entries */}
//           <h2 className="text-2xl font-bold text-white mt-10">
//             Previous Entries
//           </h2>
//           <div className="mt-10 w-full overflow-auto">
//             {entries.length > 0 ? (
//               <div className="space-y-4">
//                 {entries.map((entry) => (
//                   <div key={entry._id} className="p-4 bg-gray-700 rounded-lg">
//                     <p>
//                       <strong>Name:</strong> {entry.name}
//                     </p>
//                     <p>
//                       <strong>Email:</strong> {entry.email}
//                     </p>
//                     <p>
//                       <strong>Product Name:</strong> {entry.product}
//                     </p>
//                     <p>
//                       <strong>Barcode:</strong>
//                     </p>
//                     <div
//                       ref={(el) => {
//                         if (el) {
//                           const barcodeElement = el.querySelector("svg");
//                           if (barcodeElement) {
//                             el.innerHTML = barcodeElement.outerHTML;
//                           }
//                         }
//                       }}
//                     >
//                       <Barcode value={entry.barcode} />
//                     </div>
//                     <div className="mt-2 flex space-x-4">
//                       <button
//                         onClick={() => handleUpdate(entry)}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => handleDelete(entry._id)}
//                         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleDownloadPNG({ current: el })}
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                       >
//                         Download PNG
//                       </button>
//                       <button
//                         onClick={() => handleDownloadPDF({ current: el })}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                       >
//                         Download PDF
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-white">No previous entries</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const barcodeRef = useRef(null);
  const [barcode, setBarcode] = useState(location.state?.barcode || "");
  const [formData, setFormData] = useState(location.state?.formData || {});
  const [entries, setEntries] = useState([]);

  // Fetch all entries from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => setEntries(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Ref to keep track of entry barcodes
  const entryRefs = useRef({});

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

  const handleUpdate = (entry) => {
    navigate("/update", { state: { formData: entry } });
  };

  const handleUpdateProduct = () => {
    navigate("/update", { state: { formData: formData } });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then(() => {
        setEntries(entries.filter((entry) => entry._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-800">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col items-center h-full w-full p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">
            Barcode Description
          </h2>

          {/* Display current form data */}
          <div className="text-white mb-4">
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Product Name:</strong> {formData.product}
            </p>
          </div>

          {/* Barcode display and update button */}
          <h2 className="text-2xl font-bold text-white mb-4">
            Product Barcode
          </h2>
          {barcode ? (
            <div className="mt-2">
              <div ref={barcodeRef}>
                <Barcode value={barcode} />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleDownloadPNG(barcodeRef)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => handleDownloadPDF(barcodeRef)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <p className="text-white">No barcode available</p>
          )}

          {/* Display all entries */}
          <h2 className="text-2xl font-bold text-white mt-10">
            Previous Entries
          </h2>
          <div className="mt-10 w-full overflow-auto">
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry) => {
                  // Create a ref for each entry
                  entryRefs.current[entry._id] =
                    entryRefs.current[entry._id] || React.createRef();

                  return (
                    <div key={entry._id} className="p-4 bg-gray-700 rounded-lg">
                      <p>
                        <strong>Name:</strong> {entry.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {entry.email}
                      </p>
                      <p>
                        <strong>Product Name:</strong> {entry.product}
                      </p>
                      <p>
                        <strong>Barcode:</strong>
                      </p>
                      <div ref={entryRefs.current[entry._id]}>
                        <Barcode value={entry.barcode} />
                      </div>
                      <div className="mt-2 flex space-x-4">
                        <button
                          onClick={() => handleUpdate(entry)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleDownloadPNG(entryRefs.current[entry._id])
                          }
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Download PNG
                        </button>
                        <button
                          onClick={() =>
                            handleDownloadPDF(entryRefs.current[entry._id])
                          }
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white">No previous entries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
