// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa"; // Import an icon for the logo
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Destructure isAuthenticated

  return (
    <header className="bg-gray-700 bg-opacity-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <FaShippingFast className="text-white text-xl sm:text-2xl" />{" "}
          {/* Logo Icon */}
          <h1 className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl flex flex-wrap">
            <span className="text-gray-400">Shipment</span>
            <span className="text-gray-300"> Tracker</span>
          </h1>
        </Link>
        {/* Navigation Links */}
        <ul className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
          <li className="flex items-center gap-1 hover:underline">
            {/* Dot indicating online status */}
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  isAuthenticated
                    ? "bg-green-400 opacity-75 animate-ping"
                    : "bg-red-400 opacity-75 animate-ping"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 ${
                  isAuthenticated ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </span>
            <span className="text-xs sm:text-sm md:text-base">
              Notification
            </span>
          </li>
          <li className="hover:underline text-xs sm:text-sm md:text-base">
            <Link to="/">Account</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
