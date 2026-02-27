//userAPI.js
import { apiProcessor } from "../../services/apiProcessor";

export const changePasswordAPI = (payload) =>
  apiProcessor({
    method: "patch",
    url: "/member/change-password",
    data: payload,
    isPrivate: true,
  });

export const updateMyDetailsAPI = (payload) =>
  apiProcessor({
    method: "patch",
    url: "/member/update-mydetails",
    data: payload,
    isPrivate: true,
  });

export const fetchMembersAdminAPI = ({
  q = "",
  status = "",
  page = 1,
  limit = 10,
} = {}) => {
  return apiProcessor({
    method: "get",
    url: "/admin/users",
    params: { q, status, page, limit },
    isPrivate: true,
  });
};

export const updateMemberStatusAdminAPI = (memberId, status) => {
  return apiProcessor({
    method: "patch",
    url: `/admin/update-user/${memberId}`,
    data: { status },
    isPrivate: true,
  });
};

//superadmin
// SUPERADMIN - list all users (member + admin) with filters
export const fetchUsersSuperAdminAPI = ({
  q = "",
  status = "",
  role = "", // member/admin
  page = 1,
  limit = 10,
} = {}) =>
  apiProcessor({
    method: "get",
    url: "/superadmin/users",
    params: { q, status, role, page, limit },
    isPrivate: true,
  });

export const fetchUserByIdSuperAdminAPI = (id) =>
  apiProcessor({
    method: "get",
    url: `/superadmin/users/${id}`,
    isPrivate: true,
  });

export const createUserSuperAdminAPI = (payload) =>
  apiProcessor({
    method: "post",
    url: "/superadmin/users",
    data: payload,
    isPrivate: true,
  });

export const updateUserSuperAdminAPI = (id, payload) =>
  apiProcessor({
    method: "patch",
    url: `/superadmin/users/${id}`,
    data: payload,
    isPrivate: true,
  });

export const deleteUserSuperAdminAPI = (id) =>
  apiProcessor({
    method: "delete",
    url: `/superadmin/users/${id}`,
    isPrivate: true,
  });

export const bulkDeleteUsersSuperAdminAPI = (ids = []) =>
  apiProcessor({
    method: "delete",
    url: "/superadmin/users/bulk",
    data: { ids },
    isPrivate: true,
  });
