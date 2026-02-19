import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

//connecting to back end
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fName: "test",
    lName: "test",
    email: "test@gmail.com",
    phone: "123",
    address: "123 rd",
    password: "123",
    confirmPassword: "123",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      fName: form.fName,
      lName: form.lName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password,
    };

    const res = await dispatch(registerUserAction(payload));

    if (res?.status === "success") {
      toast.success("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] ">
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Register for BookNest
          </h2>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fName"
                  value={form.fName}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            {/* Last Name*/}
            <div>
              <label className="block text-gray-700 mb-2">Lastname</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="lName"
                  value={form.lName}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <IoIosMail className="absolute left-2 top-2 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                  required
                />
              </div>
            </div>
            <br />
            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min 8 characters"
                  required
                />
                <button
                  type="button"
                  // onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {/* {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )} */}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6 disabled:bg-gray-400"
          >
            Create Account
            {/* {loading ? "Creating Account..." : "Register"} */}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
