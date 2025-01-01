import React from "react";
import FileUpload from "../FileUpload";

const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-800 border-2 border-purple-500 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-semibold mb-6 text-purple-400">Upload Files</h1>
        <center><FileUpload /></center>
      </div>
    </div>
  );
};

export default Upload;
