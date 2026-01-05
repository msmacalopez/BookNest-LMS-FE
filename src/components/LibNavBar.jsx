import React from "react";
import { PiBookOpenBold } from "react-icons/pi";

import { Link, useLocation } from "react-router";
import { COLORS } from "../../theme.js";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../features/auth/authSlice";

const LibNavBar = () => {
  //   const location = useLocation();
  //   const { user } = useSelector((state) => state.authStore);
  //   const dispatch = useDispatch();

  const handleOnLogout = () => {
    // sessionStorage.removeItem("accessJWT");
    // localStorage.removeItem("refreshJWT");
    // dispatch(setUser({})); // Clear user from Redux store
    console.log("logout");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md max-h-16 md:px-20">
        <div className="navbar-start">
          {/* collapsive menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Books</a>
              </li>
              <li>
                <a>Link</a>
              </li>
              <li>
                <button className="btn btn-primary text-white">Log In</button>
              </li>
              <li>
                <button className="btn btn-outline btn-primary text-dark">
                  Create Account
                </button>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-4xl font-bold">
            <PiBookOpenBold className="text-blue-600 text-4xl" />
            BookNest
          </a>
        </div>
        {/* Non Collapsive _> visible when large */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl gap-2">
            <li>
              <a>Books</a>
            </li>
            <li>
              <a>Link</a>
            </li>
            <li>
              <button className="btn btn-primary text-white">Log In</button>
            </li>
            <li>
              <button className="btn btn-outline btn-primary text-dark">
                Create Account
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LibNavBar;
