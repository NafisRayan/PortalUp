import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
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
      className="h-screen bg-gradient-to-br from-pink-600 to-indigo-800 flex justify-center items-center p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="bg-black bg-opacity-60 rounded-xl shadow-lg p-8 w-full flex flex-col justify-center items-center" style={{ backdropFilter: 'blur(10px)', height: '70vh' }}>
        <motion.h1
          className="text-white font-bold text-4xl text-center mb-6"
          variants={textVariants}
        >
          Welcome to <span className="text-green-400">FileUp</span>
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg text-center mb-8"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Your secure and efficient file sharing platform. Upload and share your files with ease.
        </motion.p>
        <div className="flex justify-center">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link
              to="/upload"
              className="inline-block bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 text-black font-bold py-3 px-6 rounded-full transition-colors duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
