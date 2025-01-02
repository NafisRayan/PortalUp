import React from "react";
import FileUpload from "../components/FileUpload";

const Upload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex justify-center items-center p-4 md:p-8">
      <div className="bg-black bg-opacity-70 rounded-lg shadow-xl p-6 md:p-12 m-4 w-full max-w-sm md:max-w-md backdrop-blur-md animate-zoom-in">
        <h1 className="text-white font-bold text-3xl md:text-4xl text-center mb-6 md:mb-8 animate-pulse">
          <span className="text-pink-400">Upload</span> Your Files
        </h1>
        <div className="animate-fade-in">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default Upload;
