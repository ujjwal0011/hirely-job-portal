import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-4 py-16 mx-auto text-center lg:px-8 lg:py-32 max-w-7xl sm:px-6">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
              404 - Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Oops! The page you are looking for might have been removed or is
              temporarily unavailable.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="not404.svg"
              alt="404 Illustration"
              width={500}
              height={500}
              className="w-96 h-96 text-gray-400 dark:text-gray-600"
              priority
            />
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
