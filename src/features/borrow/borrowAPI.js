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

// admin fetch with query params: q (search by book title or member name), status (borrow status), page, limit
export const fetchAllBorrows = ({
  q = "",
  status = "",
  page = 1,
  limit = 10,
} = {}) => {
  return apiProcessor({
    method: "get",
    url: `/borrows/allborrows`,
    params: { q, status, page, limit },
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
