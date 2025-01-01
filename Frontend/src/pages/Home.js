import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-800 border-2 border-cyan-500 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-semibold mb-6 text-cyan-400">Welcome to File Uploader</h1>
        <p className="text-gray-300 mb-8 text-lg">
          Easily upload images, text, PDF, and document files. Get a shareable URL for your uploaded files.
        </p>
        <Link
          to="/upload"
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-6 py-3 rounded-lg transition duration-300 inline-block"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
