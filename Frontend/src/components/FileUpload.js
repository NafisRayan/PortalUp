import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Custom Document Icon (SVG)
const DocumentIcon = () => (
  <svg
    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-auto text-blue-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ></path>
  </svg>
);

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
  const [isUploading, setIsUploading] = useState(false);
  const [temporaryUrl, setTemporaryUrl] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    if (expirationTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = expirationTime.getTime() - now;

        if (distance < 0) {
          clearInterval(interval);
          setTemporaryUrl(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expirationTime]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
      }
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(selectedFile));
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

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
        const result = await response.json();
        setTemporaryUrl(result.temporaryUrl);
        setExpirationTime(new Date(Date.now() + 60 * 1000));
      } else {
        setUploadStatus('error');
        const errorData = await response.text();
        alert(`File upload failed. ${errorData}`);
      }
    } catch (error) {
      setUploadStatus('error');
      alert('File upload failed due to a network error.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      className="p-4 md:p-8 lg:p-10 bg-black bg-opacity-50 rounded-xl shadow-lg text-center text-white backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 ">
        <span className="text-pink-400">Drop</span> or <span className="text-green-400">Upload</span>
      </h2>
      <motion.label
        htmlFor="fileInput"
        className="border-4 border-dashed border-blue-400 rounded-lg p-6 md:p-10 lg:p-12 mb-4 md:mb-6 cursor-pointer block transition duration-300 hover:bg-blue-500 hover:bg-opacity-20"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        ref={dropRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {filePreview ? (
          <motion.div className="flex flex-col items-center">
            <motion.img
              src={filePreview}
              alt="File preview"
              className="max-h-48 mx-auto rounded-md animate-fade-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <p className="mt-2 text-sm text-green-500 animate-slide-in-down">{file.name}</p>
          </motion.div>
        ) : file ? (
          <motion.div className="flex flex-col items-center">
            <DocumentIcon />
            <p className="mt-2 text-sm text-green-500 animate-slide-in-down">{file.name}</p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center animate-fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-auto text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <p className="mt-4 text-base md:text-lg text-blue-400">
              Drag 'n' drop files here
            </p>
            <p className="text-xs md:text-sm text-gray-500">Max file size: 5MB</p>
          </motion.div>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
      </motion.label>
      <motion.div
        className="flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 md:py-2 lg:py-3 px-4 md:px-6 rounded-full transition duration-300 ease-in-out"
        >
          {isUploading ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" /> : 'Upload File'}
        </button>
      </motion.div>
      {uploadStatus === 'success' && (
        <motion.p
          className="text-green-500 mt-4 animate-fade-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          File uploaded successfully!
        </motion.p>
      )}
      {uploadStatus === 'error' && (
        <motion.p
          className="text-red-500 mt-4 animate-shake"
          initial={{ x: -10 }}
          animate={{ x: 10 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          File upload failed. Please try again.
        </motion.p>
      )}
      {temporaryUrl && (
        <motion.div
          className="mt-6 animate-slide-in-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_BACKEND_URL}${temporaryUrl}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Copy Link
            </button>
            <button
              onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}${temporaryUrl}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Download
            </button>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            Link expires in approximately 1 minute.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;