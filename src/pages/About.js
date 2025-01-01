import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">About File Uploader</h1>
        <p className="text-gray-600 mb-6">
          File Uploader is a simple and user-friendly application that allows you
          to upload images, text, PDF, and document files. Once uploaded, you
          receive a temporary URL to access or share your file.
        </p>
        <p className="text-gray-600">
          Built with React, Tailwind CSS, and love.
        </p>
      </div>
    </div>
  );
};

export default About;
