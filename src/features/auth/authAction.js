import { toast } from "react-toastify";
import { setUser, logOut as logoutSlice } from "./authSlice";
import { loginUser, fetchUser, fetchNewAccessJWT } from "./authAPI";

// LOGIN
export const loginUserAction = (form) => async (dispatch) => {
  try {
    const pending = loginUser(form);
    toast.promise(pending, { pending: "Logging in..." });

    const res = await pending;
    console.log("LOGIN RES:", res);

    // Expecting: { status, message, tokens: { accessJWT, refreshJWT } }
    // If your backend is different, adjust here.
    const { status, message, tokens, user } = res || {};
    console.log("status:", status, "tokens:", tokens, "user:", user);

    if (status) toast[status](message || "Login response received");

    if (status === "success") {
      // Save tokens
      const accessJWT = tokens?.accessToken;
      const refreshJWT = tokens?.renewToken;

      console.log("accessJWT:", accessJWT, "refreshJWT:", refreshJWT);

      if (accessJWT) sessionStorage.setItem("accessJWT", accessJWT);
      if (refreshJWT) localStorage.setItem("refreshJWT", refreshJWT);

      // If backend returns user in login response, set it immediately
      if (user?._id) {
        dispatch(setUser(user));
      } else {
        // Otherwise fetch profile
        dispatch(fetchUserAction());
      }
    }

    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message || "Login failed");
    return { status: "error", message: e.message };
  }
};

// FETCH USER PROFILE
export const fetchUserAction = () => async (dispatch) => {
  try {
    const res = await fetchUser();

    // Expecting: { user: {...} } OR user object directly
    const user = res?.user || res;

    if (user?._id) {
      dispatch(setUser(user));
      return { status: "success" };
    }

    return { status: "error", message: "No user profile returned" };
  } catch (e) {
    return {
      status: "error",
      message: e?.response?.data?.message || e.message,
    };
  }
};

// AUTO LOGIN (rehydrate on refresh) -> when refresh the page
export const autoLoginUserAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  // If access token exists, fetch profile
  if (accessJWT) {
    await dispatch(fetchUserAction());
    return;
  }

  // If only refresh exists, renew access then fetch profile
  if (refreshJWT) {
    const renewed = await fetchNewAccessJWT();
    if (renewed) {
      await dispatch(fetchUserAction());
    } else {
      dispatch(logoutUserAction());
    }
  }
};

// LOGOUT
export const logoutUserAction = () => (dispatch) => {
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  dispatch(logoutSlice());
  dispatch(setUser({})); // Clear user from Redux store
};
