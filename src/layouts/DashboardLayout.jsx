import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-[83vh] grid grid-cols-1 md:grid-cols-[16rem_1fr] xl:grid-cols-[14rem_1fr]">
      {/* Sidebar */}
      <aside className="md:min-h-full p-4 md:p-6 bg-gray-800 text-white">
        <SideBar />
      </aside>

      {/* Main content */}
      <main className="p-4 md:p-6 border border-3 border-blue-500">
        <Outlet />
      </main>
    </div>
  );
}
