//userAction.js

import {
  changePasswordAPI,
  updateMyDetailsAPI,
  fetchMembersAdminAPI,
  updateMemberStatusAdminAPI,
  fetchUsersSuperAdminAPI,
  fetchUserByIdSuperAdminAPI,
  createUserSuperAdminAPI,
  updateUserSuperAdminAPI,
  deleteUserSuperAdminAPI,
  bulkDeleteUsersSuperAdminAPI,
} from "./userAPI";
import { setUser } from "../auth/authSlice";
import {
  setAdminMembersLoading,
  setAdminMembersError,
  setAdminMembersResult,
  setAdminUsersLoading,
  setAdminUsersError,
  setAdminUsersResult,
} from "./userSlice";
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

export const fetchMembersAdminAction =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setAdminMembersLoading(true));
      dispatch(setAdminMembersError(null));

      const res = await fetchMembersAdminAPI(params);

      if (res?.status !== "success") {
        dispatch(
          setAdminMembersError(res?.message || "Failed to fetch members")
        );
        dispatch(setAdminMembersLoading(false));
        return null;
      }

      const { items, pagination, params: returnedParams } = res.data || {};
      dispatch(
        setAdminMembersResult({ items, pagination, params: returnedParams })
      );

      dispatch(setAdminMembersLoading(false));
      return res;
    } catch (e) {
      dispatch(setAdminMembersError(e?.message || "Failed to fetch members"));
      dispatch(setAdminMembersLoading(false));
      return null;
    }
  };

export const updateMemberStatusAdminAction = (memberId, status) => async () => {
  try {
    const res = await updateMemberStatusAdminAPI(memberId, status);
    return res;
  } catch (e) {
    return {
      status: "error",
      message: e?.message || "Failed to update member",
    };
  }
};

//superadmin
export const fetchUsersSuperAdminAction =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setAdminUsersLoading(true));
      dispatch(setAdminUsersError(null));

      const res = await fetchUsersSuperAdminAPI(params);

      if (res?.status !== "success") {
        dispatch(setAdminUsersError(res?.message || "Failed to fetch users"));
        dispatch(setAdminUsersLoading(false));
        return null;
      }

      const { items, pagination, params: returnedParams } = res.data || {};
      dispatch(
        setAdminUsersResult({ items, pagination, params: returnedParams })
      );
      dispatch(setAdminUsersLoading(false));
      return res;
    } catch (e) {
      dispatch(setAdminUsersError(e?.message || "Failed to fetch users"));
      dispatch(setAdminUsersLoading(false));
      return null;
    }
  };

export const fetchUserByIdSuperAdminAction = (id) => async () => {
  try {
    return await fetchUserByIdSuperAdminAPI(id);
  } catch (e) {
    return { status: "error", message: e?.message || "Failed to fetch user" };
  }
};

export const createUserSuperAdminAction = (payload) => async () => {
  try {
    return await createUserSuperAdminAPI(payload);
  } catch (e) {
    return { status: "error", message: e?.message || "Failed to create user" };
  }
};

export const updateUserSuperAdminAction = (id, payload) => async () => {
  try {
    return await updateUserSuperAdminAPI(id, payload);
  } catch (e) {
    return { status: "error", message: e?.message || "Failed to update user" };
  }
};

export const deleteUserSuperAdminAction = (id) => async () => {
  try {
    return await deleteUserSuperAdminAPI(id);
  } catch (e) {
    return { status: "error", message: e?.message || "Failed to delete user" };
  }
};

export const bulkDeleteUsersSuperAdminAction =
  (ids = []) =>
  async () => {
    try {
      return await bulkDeleteUsersSuperAdminAPI(ids);
    } catch (e) {
      return { status: "error", message: e?.message || "Bulk delete failed" };
    }
  };
