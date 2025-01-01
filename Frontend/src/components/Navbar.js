import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-red-600 text-3xl font-bold">
          File Uploader
        </Link>
        <div className="flex space-x-8 items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">
            Home
          </Link>
          <Link to="/upload" className="text-gray-300 hover:text-white transition duration-300">
            Upload
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
