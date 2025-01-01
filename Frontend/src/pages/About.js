import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-8 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-900 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-semibold mb-6 text-red-500">About File Uploader</h1>
        <p className="text-gray-300 mb-8 text-lg">
          File Uploader is a simple and user-friendly application that allows you to upload images, text, PDF, and document files. Once uploaded, you receive a temporary URL to access or share your file.
        </p>
        <p className="text-gray-300 text-sm">
          Built with React, Tailwind CSS, and love.
        </p>
      </div>
    </div>
  );
};

export default About;
