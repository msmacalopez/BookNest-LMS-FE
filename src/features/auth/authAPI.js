//authAPI.js

// create a function loginUser that takes email and password as parameters
// use apiProcessor to make a post request to /auth/login with email and password as data
// return the response from apiProcessor

import { apiProcessor } from "../../services/apiProcessor.js";

export const loginUser = async (data) => {
  return apiProcessor({
    method: "post",
    url: "/auth/login",
    data, //form data = { email, password }
  });
};

// Get user profile
export const fetchUser = async () => {
  return apiProcessor({
    method: "get",
    url: "/member/mydetails",
    isPrivate: true,
  });
};

// Get user profile
export const fetchNewAccessJWT = async () => {
  const { tokens } = await apiProcessor({
    method: "get",
    url: "/auth/renew-jwt",
    isPrivate: true,
    isRefreshToken: true,
  });
  // store new accessJWT in session storage
  if (tokens?.accessToken) {
    sessionStorage.setItem("accessJWT", tokens.accessToken);
    return true;
  }
  return false;
};

//register user
export const registerUser = async (data) =>
  apiProcessor({
    method: "post",
    url: "/member/register",
    data,
    isPrivate: false,
  });

//nodemailer
export const verifyEmailAPI = async (token) =>
  apiProcessor({
    method: "get",
    url: `/member/verify-email?token=${token}`,
    isPrivate: false,
  });

//nodemailer
export const resendVerificationEmailAPI = async (email) =>
  apiProcessor({
    method: "post",
    url: "/member/resend-verification",
    data: { email },
    isPrivate: false,
  });
