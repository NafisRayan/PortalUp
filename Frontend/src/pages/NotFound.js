import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-8 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-900 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-semibold mb-6 text-red-500">404 - Page Not Found</h1>
        <p className="text-gray-300 mb-8 text-lg">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition duration-300 inline-block"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
