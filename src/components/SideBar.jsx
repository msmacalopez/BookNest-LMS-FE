import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-5">
      {/* title */}
      <div>
        <h1 className="font-bold text-2xl text-white">Hi Maca!</h1>
        <h2 className="font-mono text-accent">Welcome to your Dashboard! </h2>
      </div>
      {/* MEMBERS */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl"> Menu</p>
        <Link to="/dashboard/myborrows">My Borrows</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </div>
      <hr />
      {/* ADMINS */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl"> Admin Menu</p>
        <Link to="/dashboard/books">Manage Books</Link>
        <Link to="/dashboard/borrows">Manage Borrows</Link>
        <Link to="/dashboard/reviews">Manage Review</Link>
      </div>
      <hr />
      {/* SUPER ADMINS */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl"> System Admin</p>
        <Link to="/dashboard/admins">Manage Librarians</Link>
      </div>
    </div>
  );
}
