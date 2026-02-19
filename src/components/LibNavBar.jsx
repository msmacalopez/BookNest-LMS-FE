import React from "react";
import { PiBookOpenBold } from "react-icons/pi";

import { Link, useLocation } from "react-router";
import { COLORS } from "../../theme.js";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../features/auth/authSlice";
import ThemeController from "./ThemeController.jsx";

//redux logout
import { logoutUserAction } from "../features/auth/authAction.js";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const LibNavBar = () => {
  //   const location = useLocation();
  const { user } = useSelector((state) => state.authStore);
  //   const dispatch = useDispatch();

  //const handleOnLogout = () => {
  // sessionStorage.removeItem("accessJWT");
  // localStorage.removeItem("refreshJWT");
  // dispatch(setUser({})); // Clear user from Redux store
  //console.log("logout");
  //};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-md max-h-16 md:px-20">
        <div className="navbar-start">
          {/* collapsive menu - Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            {/* List Collapsive */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/allbooks"
                  className="text-lg flex-items items-center justify-center my-0.5"
                >
                  Books
                </Link>
              </li>

              {user?._id ? (
                <li>
                  <button
                    onClick={handleOnLogout}
                    className="text-md flex-items items-center justify-center my-0.5 py-2"
                  >
                    LogOut
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="btn btn-primary text-white my-0.5"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="btn btn-outline btn-primary text-dark my-0.5"
                    >
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Logo BOOKNEST */}
          <Link to="/" className="btn btn-ghost text-4xl font-bold">
            <PiBookOpenBold className="text-blue-600 text-4xl" />
            BookNest
          </Link>
        </div>
        {/* Non Collapsive -> visible when large */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl gap-2">
            <li>
              <Link to="/allbooks">Books</Link>
            </li>

            {user?._id ? (
              <li>
                <button
                  onClick={handleOnLogout}
                  className="text-md flex-items items-center justify-center"
                >
                  LogOut
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="btn btn-primary text-white">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn btn-outline btn-primary text-dark"
                  >
                    Create Account
                  </Link>
                  <p className="hidden">Log Out</p>
                </li>
              </>
            )}
            <li>
              <ThemeController />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LibNavBar;
