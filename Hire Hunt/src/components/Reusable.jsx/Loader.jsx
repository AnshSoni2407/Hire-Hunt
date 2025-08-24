import React from "react";

const FancyLoader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-4 animate-fadeIn">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-1 rounded-full bg-blue-100"></div>
      </div>
      <div className="text-blue-700 text-lg font-bold tracking-wide animate-pulse">
        Please wait...
      </div>
    </div>
  );
};

export default FancyLoader;
