import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Here you would typically send the formData to a server
      console.log("Uploading file:", file.name);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Upload File</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
