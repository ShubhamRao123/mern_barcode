import React from "react";
import { useProgress } from "./ProgressContext"; // Import context hook

const Rightbar = () => {
  const { progress } = useProgress(); // Access progress state from context

  return (
    <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-16 lg:w-56 xl:w-60 h-full bg-gray-800 flex flex-col items-center justify-center p-3 md:p-6 border-l-2 border-gray-600 shadow-lg">
      {/* Sender Status */}
      <div className="mb-4 md:mb-6 flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
        <span
          className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
            progress.sender ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {/* Hide text below 970px */}
        <p className="text-white text-sm md:text-lg font-semibold hidden lg:block">
          Sender
        </p>
      </div>

      {/* Receiver Status */}
      <div className="mb-4 md:mb-6 flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
        <span
          className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
            progress.receiver ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {/* Hide text below 970px */}
        <p className="text-white text-sm md:text-lg font-semibold hidden lg:block">
          Receiver
        </p>
      </div>

      {/* Shipment Status */}
      <div className="mb-4 md:mb-6 flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
        <span
          className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
            progress.shipment ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {/* Hide text below 970px */}
        <p className="text-white text-sm md:text-lg font-semibold hidden lg:block">
          Shipment
        </p>
      </div>

      {/* Tracking Status */}
      <div className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
        <span
          className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
            progress.tracking ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {/* Hide text below 970px */}
        <p className="text-white text-sm md:text-lg font-semibold hidden lg:block">
          Tracking
        </p>
      </div>
    </div>
  );
};

export default Rightbar;
