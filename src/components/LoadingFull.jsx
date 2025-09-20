
import React from "react";
import { motion } from "framer-motion";

const LoadingFull = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full"
      />
      <span className="ml-3 text-blue-600 font-semibold text-lg">
        Loading...
      </span>
    </div>
  );
};

export default LoadingFull;
