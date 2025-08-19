import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/index";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  // Local state to hold signup form values
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Update state when user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // just logs which field is changing
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Basic validation before sending request
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      // Backend API endpoint (Express server running on port 8080)
      // Yehi pe data jaa raha hai backend ko
      const url = "http://localhost:5000/api/auth/signup";


      // Data request body mei JSON format me bheja jaa raha hai
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo), // <-- yaha se data backend ko bheja jaa raha hai
      };

      // Request bhejna
      const response = await fetch(url, requestOptions);
      const result = await response.json();

      // Backend response destructure
      const { success, message, error } = result;

      if (success) {
        // Success case → backend ne data DB mei store kar liya
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000); // redirect to login
      } else if (error) {
        // Agar backend validation error aayi toh
        const details = error?.details?.length
          ? error.details[0].message
          : message;
        handleError(details);
      } else {
        handleError(message || "Signup failed");
      }

      console.log(result); // Debug backend response
    } catch (err) {
      // Agar server hi down hai ya koi aur issue hai
      handleError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Sign Up
          </button>

          {/* Redirect to login link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
