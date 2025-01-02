import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-600 to-indigo-800 p-4 sm:p-6 flex justify-between items-center shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
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
        FileUp
      </NavLink>
      <div className="flex space-x-4 sm:space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? 'bg-green-500 text-white' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? 'bg-green-500 text-white' : ''
            }`
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 sm:px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-300 ${
              isActive ? 'bg-green-500 text-white' : ''
            }`
          }
        >
          About
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default Navbar;
