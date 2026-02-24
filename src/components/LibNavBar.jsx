import React from "react";
import { PiBookOpenBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ThemeController from "./ThemeController.jsx";
import { logoutUserAction } from "../features/auth/authAction.js";
import { resetCatalogInNavbar } from "../features/book/bookSlice.js";
import { fetchPublicBooksAction } from "../features/book/bookAction.js";

const LibNavBar = () => {
  const { user } = useSelector((state) => state.authStore);

  // In case your store key is booksStore / bookStore / books, this makes it robust:
  const booksState = useSelector((state) => state.bookStore);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

  const handleBooksClick = (e) => {
    e?.preventDefault?.();

    const limit = booksState?.catalog?.pagination?.limit ?? 10;

    // 1) Reset redux catalog state (q="", page=1 etc.)
    dispatch(resetCatalogInNavbar());

    // 2) Force a fresh fetch with empty query = "show all"
    dispatch(
      fetchPublicBooksAction({
        q: "",
        page: 1,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      })
    );

    // 3) Go to All Books page (even if already there, data refresh is already triggered)
    navigate("/allbooks");
  };

  return (
    <div className="navbar bg-base-100 shadow-md max-h-16 md:px-20">
      <div className="navbar-start">
        {/* Mobile Menu */}
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
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to="/allbooks"
                className="text-lg flex-items items-center justify-center my-0.5"
                onClick={handleBooksClick}
              >
                Books
              </Link>
            </li>

            {user?._id ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-lg my-0.5">
                    My Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleOnLogout}
                    className="text-md my-0.5 py-2"
                  >
                    LogOut
                  </button>
                </li>
              </>
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

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-4xl font-bold">
          <PiBookOpenBold className="text-blue-600 text-4xl" />
          BookNest
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl gap-2">
          <li>
            <Link to="/allbooks" onClick={handleBooksClick}>
              Books
            </Link>
          </li>

          {user?._id ? (
            <>
              <li>
                <Link to="/dashboard">My Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleOnLogout}
                  className="text-sm flex-items items-center justify-center h-10 p-2.5"
                >
                  LogOut
                </button>
              </li>
            </>
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
              </li>
            </>
          )}

          <li>
            <ThemeController />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LibNavBar;
