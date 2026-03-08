import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function SideBar() {
  //to display certain menu on SideBar
  const { user } = useSelector((state) => state.authStore);

  //to hightlight the active menu item
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => setIsOpen(false);

  const memberItems = [
    // { name: "Dashboard", path: "/dashboard" },
    { name: "My Borrows", path: "/dashboard/myborrows" },
    { name: "My Profile", path: "/dashboard/profile" },
    { name: "My Reviews", path: "/dashboard/myreviews" },
    { name: "My Holds", path: "/dashboard/myholds" },
  ];

  const adminItems = [
    // { name: "Admin Dashboard", path: "/dashboard/admin" },
    { name: "Books", path: "/dashboard/books" },
    { name: "Holds", path: "/dashboard/holds" },
    { name: "Borrows", path: "/dashboard/borrows" },
    { name: "Reviews", path: "/dashboard/reviews" },
    { name: "Members", path: "/dashboard/members" },
  ];

  const superAdminItems = [{ name: "Manage Users", path: "/dashboard/admins" }];

  return (
    <>
      {/* mobile toggle button */}
      <div className="md:hidden mb-3">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col gap-3`}>
        {/* title */}
        <div>
          {/* <h1 className="font-bold text-2xl text-white">{user.fName}</h1> */}
          <h1 className="font-mono text-accent text-xl">Hello {user.fName}!</h1>
        </div>

        {/* MEMBERS */}
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="font-bold text-lg"
            onClick={handleCloseSidebar}
          >
            Dashboard
          </Link>

          {memberItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                `px-2 py-1.5 rounded-lg transition ${
                  isActive
                    ? "border-l-4 border-primary text-primary font-semibold bg-base-200"
                    : "hover:bg-base-200"
                }`
              }
              // className={({ isActive }) =>
              //   `px-3 py-2 rounded-lg transition ${
              //     isActive
              //       ? "border-l-4 border-primary text-primary font-semibold"
              //       : "hover:bg-base-200"
              //   }`
              // }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* ADMINS */}
        {["admin", "superadmin"].includes(user?.role) && (
          <div className="flex flex-col gap-2">
            <hr />
            <Link
              to="/dashboard/admin"
              className="font-bold text-lg"
              onClick={handleCloseSidebar}
            >
              Admin Dashboard
            </Link>

            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={handleCloseSidebar}
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg transition ${
                    isActive
                      ? "border-l-4 border-primary text-primary font-semibold bg-base-200"
                      : "hover:bg-base-200"
                  }`
                }
                // className={({ isActive }) =>
                //   `px-3 py-2 rounded-lg transition ${
                //     isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
                //   }`
                // }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* SUPER ADMINS */}
        {user?.role === "superadmin" && (
          <div className="flex flex-col gap-2">
            <hr />
            <p className="font-bold text-lg"> System Admin</p>

            {superAdminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={handleCloseSidebar}
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg transition ${
                    isActive
                      ? "border-l-4 border-primary text-primary font-semibold bg-base-200"
                      : "hover:bg-base-200"
                  }`
                }
                // className={({ isActive }) =>
                //   `px-3 py-2 rounded-lg transition ${
                //     isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
                //   }`
                // }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
