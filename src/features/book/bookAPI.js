//bookAPI.js
import { apiProcessor } from "../../services/apiProcessor";

export const fetchAllActiveBooks = async ({
  q = "",
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) => {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);

  return apiProcessor({
    method: "get",
    url: `/books/searchbooks?${params.toString()}`,
    isPrivate: false,
  });
};
export const searchPublicBooksAPI = (params) =>
  apiProcessor({
    method: "get",
    url: "/books/searchbooks",
    params,
    isPrivate: false,
  });

export const fetchActiveBookById = async (id) =>
  apiProcessor({
    method: "get",
    url: `/books/book/${id}`,
    isPrivate: false,
  });

//admin -> private
export const fetchAdminAllBooks = async ({
  q = "",
  page = 1,
  limit = 10,
} = {}) => {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  return apiProcessor({
    method: "get",
    url: `/books/searchallbooks?${params.toString()}`,
    isPrivate: true,
  });
};
export const searchAllBooksAPI = (params) =>
  apiProcessor({
    method: "get",
    url: "/books/searchallbooks",
    params,
    isPrivate: true,
  });

// ADMIN create a book
export const addBookAdminAPI = (data) =>
  apiProcessor({
    method: "post",
    url: "/books/addbook",
    data,
    isPrivate: true,
  });

// ADMIN read one (active+inactive)
export const fetchBookByIdAdmin = (bookId) =>
  apiProcessor({
    method: "get",
    url: `/books/allbooks/${bookId}`,
    isPrivate: true,
  });

// ADMIN update a book
export const updateBookAdminAPI = (bookId, data) =>
  apiProcessor({
    method: "patch",
    url: `/books/updatebook/${bookId}`,
    data,
    isPrivate: true,
  });

// ADMIN delete a book
export const deleteBookAdminAPI = (bookId) =>
  apiProcessor({
    method: "delete",
    url: `/books/deletebook/${bookId}`,
    isPrivate: true,
  });
