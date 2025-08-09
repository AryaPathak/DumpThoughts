import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      {/* Text */}
      <p className="mt-6 text-lg font-semibold animate-pulse">
        Loading your feed...
      </p>
    </div>
  );
};

export default Loader;
