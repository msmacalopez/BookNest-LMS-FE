import { apiProcessor } from "../../services/apiProcessor";

// ADMIN: list all holds with search + filters
export const fetchAllHolds = ({
  q = "",
  status = "",
  page = 1,
  limit = 10,
} = {}) => {
  return apiProcessor({
    method: "get",
    url: `/holds/allholds`,
    params: { q, status, page, limit },
    isPrivate: true,
  });
};

// MEMBER any: list my holds
export const fetchMyHolds = ({ page = 1, limit = 10 } = {}) => {
  return apiProcessor({
    method: "get",
    url: `/holds/myholds`,
    params: { page, limit },
    isPrivate: true,
  });
};

// MEMBER any: cancel my hold
export const cancelMyHold = (holdId) => {
  return apiProcessor({
    method: "patch",
    url: `/holds/cancel/${holdId}`,
    isPrivate: true,
  });
};

// ADMIN: fulfill hold -> creates borrow
export const adminFulfillHold = (holdId) => {
  return apiProcessor({
    method: "post",
    url: `/holds/fulfill/${holdId}`,
    isPrivate: true,
  });
};

export const createMyHold = (bookId) => {
  return apiProcessor({
    method: "post",
    url: `/holds/${bookId}`,
    isPrivate: true,
  });
};
