import {
  fetchAllActiveBooks,
  fetchActiveBookById,
  fetchAdminAllBooks,
  fetchBookByIdAdmin,
} from "./bookAPI";

export const fetchPublicBooksAction = (params) => async () => {
  return await fetchAllActiveBooks(params);
};

export const fetchActiveBookByIdAction = (bookId) => async () => {
  return await fetchActiveBookById(bookId);
};

export const fetchAdminAllBooksAction = (params) => async () => {
  return await fetchAdminAllBooks(params);
};

export const fetchBookByIdAdminAction = (bookId) => async () => {
  return await fetchBookByIdAdmin(bookId);
};
