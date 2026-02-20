import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function SideBar() {
  //to display certain menu on SideBar
  const { user } = useSelector((state) => state.authStore);

  //to hightlight the active menu item
  const location = useLocation();

  const memberItems = [
    // { name: "Dashboard", path: "/dashboard" },
    { name: "My Borrows", path: "/dashboard/myborrows" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "My Reviews", path: "/dashboard/myreviews" },
  ];

  const adminItems = [
    { name: "Books", path: "/dashboard/books" },
    { name: "Borrows", path: "/dashboard/borrows" },
    { name: "Review", path: "/dashboard/reviews" },
    { name: "Members", path: "/dashboard/members" },
  ];

  const superAdminItems = [
    { name: "Manage Librarians", path: "/dashboard/admins" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* title */}
      <div>
        {/* <h1 className="font-bold text-2xl text-white">{user.fName}</h1> */}
        <h1 className="font-mono text-accent text-2xl">
          Welcome {user.fName}!
        </h1>
      </div>
      {/* MEMBERS */}
      <div className="flex flex-col gap-3">
        <Link to="/dashboard" className="font-bold text-xl">
          Dashboard
        </Link>
        {memberItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
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

        {/* <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/myborrows">My Borrows</Link>
        <Link to="/dashboard/profile">Profile</Link> */}
      </div>

      {/* ADMINS */}
      {["admin", "superadmin"].includes(user?.role) && (
        <div className="flex flex-col gap-3">
          <hr />
          <p className="font-bold text-xl"> Manage</p>
          {adminItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              // className={({ isActive }) =>
              //   `px-3 py-2 rounded-lg transition ${
              //     isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
              //   }`
              // }
            >
              {item.name}
            </NavLink>
          ))}
          {/* <Link to="/dashboard/books">Books</Link>
        <Link to="/dashboard/borrows">Borrows</Link>
        <Link to="/dashboard/reviews">Review</Link>
        <Link to="/dashboard/members">Members</Link> */}
        </div>
      )}
      {/* SUPER ADMINS */}
      {user?.role === "superadmin" && (
        <div className="flex flex-col gap-3">
          <hr />
          <p className="font-bold text-xl"> System Admin</p>
          {superAdminItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              // className={({ isActive }) =>
              //   `px-3 py-2 rounded-lg transition ${
              //     isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
              //   }`
              // }
            >
              {item.name}
            </NavLink>
          ))}
          {/* <Link to="/dashboard/admins">Manage Librarians</Link> */}
        </div>
      )}
    </div>
  );
}
