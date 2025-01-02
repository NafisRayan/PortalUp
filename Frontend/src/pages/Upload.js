import React from "react";
import FileUpload from "../components/FileUpload";

const Upload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="bg-black bg-opacity-70 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 m-2 sm:m-4 w-full  backdrop-blur-md animate-zoom-in">
        <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 animate-pulse">
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
