import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();

  //read reduxStore to get user info and check if user is logged in
  const { user, isAuthReady } = useSelector((state) => state.authStore);

  if (!isAuthReady) return null; // or loading spinner

  // state.authStore.user exist, then render children
  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default Auth;
