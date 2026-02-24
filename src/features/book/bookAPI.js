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
    url: `/books/books/${id}`, // match your rest.http: GET {{bookEP}}/books/:id
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

//admin ->private (search in unactive books as well)
export const fetchBookByIdAdmin = async (bookId) =>
  apiProcessor({
    method: "get",
    url: `/books/books/${bookId}`,
    isPrivate: true,
  });
