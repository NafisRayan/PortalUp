import React from "react";
import FileUpload from "../FileUpload";

const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Upload Files</h1>
        <FileUpload />
      </div>
    </div>
  );
};

export default Upload;
