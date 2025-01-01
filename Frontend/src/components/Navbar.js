import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-6 flex justify-between items-center">
      <Link to="/" className="text-green-400 text-3xl font-bold">
        File Uploader
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="py-2 px-4 text-gray-400 hover:text-green-200 hover:bg-gray-800 rounded transition duration-200">
          Home
        </Link>
        <Link to="/upload" className="py-2 px-4 text-gray-400 hover:text-green-200 hover:bg-gray-800 rounded transition duration-200">
          Upload
        </Link>
        <Link to="/about" className="py-2 px-4 text-gray-400 hover:text-green-200 hover:bg-gray-800 rounded transition duration-200">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
