import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to File Uploader</h1>
        <p className="text-gray-600 mb-6">
          Easily upload images, text, PDF, and document files. Get a shareable
          URL for your uploaded files.
        </p>
        <Link
          to="/upload"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Go to Upload
        </Link>
      </div>
    </div>
  );
};

export default Home;
