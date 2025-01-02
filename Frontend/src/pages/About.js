import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delay: 0.5, duration: 0.6, type: "spring", stiffness: 150 } },
    hover: { scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)", boxShadow: "0px 0px 8px rgb(255,255,255)", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex justify-center items-center p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="bg-black bg-opacity-60 rounded-lg shadow-xl p-6 md:p-12 m-4 w-full backdrop-blur-md animate-zoom-in flex flex-col justify-center items-center" style={{ height: '70vh' }}>
        <motion.h1
          className="text-white font-bold text-3xl md:text-4xl text-center mb-6 md:mb-8 "
          variants={textVariants}
        >
          About <span className="text-teal-400">File Uploader</span>
        </motion.h1>
        <motion.p
          className="text-gray-300 text-sm md:text-base lg:text-lg text-center mb-4 md:mb-6"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          <span className="font-semibold text-teal-400">File Uploader</span> is designed to make file sharing seamless and efficient.
          Upload your images, documents, and other files to get a temporary, shareable link.
        </motion.p>
        <p className="text-gray-400 text-xs md:text-sm text-center ">
          Built with <span className="text-red-500">React</span> and <span className="text-sky-500">Tailwind CSS</span>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
