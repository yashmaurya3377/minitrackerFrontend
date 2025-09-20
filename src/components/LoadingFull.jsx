import React from "react";
import { motion } from "framer-motion";

const LoadingFull = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      {/* Spinner with multiple circles */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        {/* Middle circle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute w-14 h-14 border-4 border-blue-400 border-b-transparent rounded-full"
        />
        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute w-6 h-6 bg-blue-600 rounded-full"
        />
      </div>

      {/* Animated loading text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-4 text-blue-600 font-semibold text-lg text-center"
      >
        <p>Loading...</p>
        <p className="text-sm text-blue-500">Connecting to Database</p>
      </motion.div>
    </div>
  );
};

export default LoadingFull;
