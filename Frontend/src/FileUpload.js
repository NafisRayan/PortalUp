import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (droppedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(droppedFile));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
        const result = await response.json();
        console.log(result.temporaryUrl);
        alert(`File uploaded successfully! Temporary URL: ${result.temporaryUrl}`);
      } else {
        setUploadStatus('error');
        const errorData = await response.text();
        console.error('Upload failed:', errorData);
        alert(`File upload failed. ${errorData}`);
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
      alert('File upload failed due to a network error.');
    }
  };

  return (
    <div className="max-w-md p-8 bg-gray-800 rounded-xl shadow-lg text-center text-white">
      <h2 className="text-3xl font-semibold mb-4">File Upload</h2>
      <p className="text-gray-400 mb-6">Drop your files here or click to upload</p>
      <label
        htmlFor="fileInput"
        className="border-2 border-dashed border-gray-600 rounded-lg p-16 mb-4 cursor-pointer block"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      >
        {filePreview ? (
          <img src={filePreview} alt="File preview" className="max-h-32 mx-auto mb-4" />
        ) : file ? (
          <p className="mt-2 text-sm text-blue-500">{file.name}</p>
        ) : (
          <>
            <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <p className="mt-2 text-sm text-blue-500">Upload a file or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
      </label>
      <button onClick={handleUpload} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition duration-300">
        Upload
      </button>
      {uploadStatus === 'success' && <p className="text-green-500 mt-2">File uploaded successfully!</p>}
      {uploadStatus === 'error' && <p className="text-red-500 mt-2">File upload failed. Please try again.</p>}
    </div>
  );
};

export default FileUpload;
