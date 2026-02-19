import React, { use, useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  autoLoginUserAction,
  loginUserAction,
} from "../../features/auth/authAction";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  //reduxStore
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authStore);

  const [form, setForm] = useState({
    email: "test@a.com",
    password: "123",
  });

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user?._id) {
      navigate(from, { replace: true });
    } else {
      dispatch(autoLoginUserAction());
    }
  }, [user, navigate, dispatch, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserAction(form));
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login to BookNest
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <IoIosMail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                // type={showPassword ? "text" : "password"}
                // value={password}
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
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
