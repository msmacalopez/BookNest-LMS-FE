import React from "react";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <form
          // onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login to BookNest
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <IoIosMail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                // type={showPassword ? "text" : "password"}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                // onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {/* {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )} */}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Login
            {/* {loading ? "Logging in..." : "Login"} */}
          </button>
          {/* FAKEEE */}
          <Link to="/dashboard" className="btn btn-primary mt-2 w-full">
            Fake Login
          </Link>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
