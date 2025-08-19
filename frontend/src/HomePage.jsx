// src/components/HomePage.jsx
import { Link } from "react-router-dom"; // For navigation between pages
import { useEffect, useState } from "react";
const HomePage = () => {
  const [loggedInUser, setLoggedInUSer] = useState("");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full px-4 py-8 sm:py-12 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-600 mb-4 sm:mb-6 transition-all duration-300 hover:text-blue-700">
          Welcome to PromptVault
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          A simple app to create, manage, and organize your AI Prompts efficiently.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Login Button */}
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Login
            </button>
          </Link>

          {/* Signup Button */}
          <Link to="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
