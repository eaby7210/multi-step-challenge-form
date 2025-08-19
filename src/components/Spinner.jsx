import React from "react";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="  w-full max-w-xs p-6 flex flex-col items-center">
        <Loader2 className="w-18 h-18 text-white animate-spin mb-2" />
        {/* <span className="text-gray-700 font-medium">Loading...</span> */}
      </div>
    </div>
  );
};

export default LoadingOverlay;