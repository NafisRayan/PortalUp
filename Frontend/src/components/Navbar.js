import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-600 to-indigo-800 p-4 sm:p-6 flex flex-wrap justify-between items-center shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="flex items-center">
        <NavLink to="/" className="text-white text-xl sm:text-3xl font-bold flex items-center">
          <motion.svg
            className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-green-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8l-4-4-4 4M12 4.2v15.8" />
          </motion.svg>
          PortalUp
        </NavLink>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="block sm:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full sm:w-auto sm:flex sm:space-x-4 sm:space-x-6 mt-4 sm:mt-0`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? "bg-green-500 text-white" : ""
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `block px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? "bg-green-500 text-white" : ""
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Upload
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? "bg-green-500 text-white" : ""
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default Navbar;