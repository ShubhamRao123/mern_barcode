import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-700 bg-opacity-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-400">Delote</span>
            <span className="text-gray-300"> Techonology</span>
          </h1>
        </Link>
        <ul className=" flex gap-6">
          <li className="hover:underline">Home</li>

          <li className="hover:underline">SignIn</li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
