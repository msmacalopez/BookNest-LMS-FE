import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRendering({
  allowedRoles = [],
  requireActive = false,
}) {
  const { user, isAuthReady } = useSelector((state) => state.authStore);

  if (!isAuthReady) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  if (requireActive && user?.status !== "active") {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
