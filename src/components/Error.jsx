import React from "react";
import { AlertTriangle } from "lucide-react";

const ErrorPage = ({ message = "Something went wrong.", code = 500 }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Error {code}</h1>
      <p className="text-gray-600 max-w-md">{message}</p>
    </div>
  );
};

export default ErrorPage;