import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-700 flex justify-center items-center p-4 md:p-8">
    <div className="bg-black bg-opacity-60 rounded-lg shadow-xl p-6 md:p-12 m-4 w-full backdrop-blur-md animate-fade-in">
        <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-6 md:mb-8 animate-slide-in-down">
          About <span className="text-teal-400">File Uploader</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base lg:text-lg text-center mb-4 md:mb-6">
          <span className="font-semibold text-teal-400">File Uploader</span> is designed to make file sharing seamless and efficient.
          Upload your images, documents, and other files to get a temporary, shareable link.
        </p>
        <p className="text-gray-400 text-xs md:text-sm text-center animate-pulse">
          Built with <span className="text-red-500">React</span> and <span className="text-sky-500">Tailwind CSS</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
