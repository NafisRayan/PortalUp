import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          File Uploader
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/upload" className="text-white hover:text-gray-200">
            Upload
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
