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
