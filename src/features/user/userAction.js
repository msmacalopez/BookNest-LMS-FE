//userAction.js

import { changePasswordAPI, updateMyDetailsAPI } from "./userAPI";
import { setUser } from "../auth/authSlice";
import { toast } from "react-toastify";

export const changePasswordAction = (payload) => async () => {
  return changePasswordAPI(payload);
};

export const updateMyDetailsAction = (payload) => async (dispatch) => {
  try {
    const pending = updateMyDetailsAPI(payload);
    toast.promise(pending, { pending: "Saving changes..." });

    const res = await pending;

    // your backend returns: { status, message, data: updatedUser }
    const updatedUser = res?.data || res?.user || res;

    if (updatedUser?._id) {
      dispatch(setUser(updatedUser)); // ✅ keep redux in sync
    }

    toast.success(res?.message || "Details updated");
    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message || "Update failed");
    throw e;
  }
};
