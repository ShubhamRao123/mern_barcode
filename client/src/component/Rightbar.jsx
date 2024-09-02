import React from "react";
import { useProgress } from "./ProgressContext"; // Import context hook

const Rightbar = () => {
  const { progress } = useProgress(); // Access progress state from context
  return (
    <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-60 h-full bg-gray-800 flex flex-col items-center justify-center p-6 border-l-2 border-gray-600 shadow-lg">
      <div className="mb-6 flex items-center space-x-3">
        <span
          className={`h-4 w-4 rounded-full ${
            progress.sender ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p className="text-white text-lg font-semibold">Sender</p>
      </div>
      <div className="mb-6 flex items-center space-x-3">
        <span
          className={`h-4 w-4 rounded-full ${
            progress.receiver ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p className="text-white text-lg font-semibold">Receiver</p>
      </div>
      <div className="mb-6 flex items-center space-x-3">
        <span
          className={`h-4 w-4 rounded-full ${
            progress.shipment ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p className="text-white text-lg font-semibold">Shipment</p>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`h-4 w-4 rounded-full ${
            progress.tracking ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p className="text-white text-lg font-semibold">Tracking</p>
      </div>
    </div>
  );
};

export default Rightbar;
