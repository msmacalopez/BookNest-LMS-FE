import { apiProcessor } from "../../services/apiProcessor";

export const createMyBorrow = async (bookId) => {
  return apiProcessor({
    method: "post",
    url: `/borrows/${bookId}`,
    isPrivate: true, // IMPORTANT: must attach Authorization token
  });
};

export const fetchMyBorrows = ({ page = 1, limit = 10 } = {}) => {
  return apiProcessor({
    method: "get",
    url: `/borrows/myborrows?page=${page}&limit=${limit}`,
    isPrivate: true,
  });
};

// (Optional for admin pages later)
export const fetchAllBorrows = async () => {
  return apiProcessor({
    method: "get",
    url: `/borrows/allborrows`,
    isPrivate: true,
  });
};

export const adminReturnBook = async (borrowId) => {
  return apiProcessor({
    method: "patch",
    url: `/borrows/returnbook/${borrowId}`,
    isPrivate: true,
  });
};
