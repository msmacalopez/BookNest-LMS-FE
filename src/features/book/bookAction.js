import {
  searchPublicBooksAPI,
  searchAllBooksAPI,
  fetchActiveBookById,
  fetchBookByIdAdmin,
} from "./bookAPI";

import {
  setCatalogLoading,
  setCatalogError,
  setCatalogSearchResult,
  resetCatalogInNavbar,
  setPopularLoading,
  setPopularError,
  setPopularBooks,
  setLatestLoading,
  setLatestError,
  setLatestBooks,
} from "./bookSlice";

// PUBLIC search (no auth)
export const fetchPublicBooksAction =
  (params = {}) =>
  async (dispatch) => {
    dispatch(setCatalogLoading(true));
    dispatch(setCatalogError(null));

    try {
      const res = await searchPublicBooksAPI(params);

      if (res.status !== "success")
        throw new Error(res.message || "Search failed");

      dispatch(
        setCatalogSearchResult({
          items: res.data,
          pagination: res.pagination,
          mode: "public",
          params,
        })
      );
    } catch (e) {
      dispatch(setCatalogError(e.message));
    } finally {
      dispatch(setCatalogLoading(false));
    }
  };

// ADMIN search (auth + isAdmin)
export const fetchAllBooksAction =
  (params = {}) =>
  async (dispatch) => {
    dispatch(setCatalogLoading(true));
    dispatch(setCatalogError(null));

    try {
      const res = await searchAllBooksAPI(params);

      if (res.status !== "success")
        throw new Error(res.message || "Search failed");

      dispatch(
        setCatalogSearchResult({
          items: res.data,
          pagination: res.pagination,
          mode: "admin",
          params,
        })
      );
    } catch (e) {
      dispatch(setCatalogError(e.message));
    } finally {
      dispatch(setCatalogLoading(false));
    }
  };

// POPULAR BOOKS
export const fetchPopularBooksAction =
  ({ limit = 3 } = {}) =>
  async (dispatch) => {
    dispatch(setPopularLoading(true));
    dispatch(setPopularError(null));

    try {
      const res = await searchPublicBooksAPI({
        page: 1,
        limit,
        sortBy: "timesBorrowed",
        sortOrder: "desc",
      });

      if (res.status !== "success") throw new Error(res.message);

      dispatch(setPopularBooks(res.data));
    } catch (e) {
      dispatch(setPopularError(e.message));
    } finally {
      dispatch(setPopularLoading(false));
    }
  };

// LATEST BOOKS
export const fetchLatestBooksAction =
  ({ limit = 3 } = {}) =>
  async (dispatch) => {
    dispatch(setLatestLoading(true));
    dispatch(setLatestError(null));

    try {
      const res = await searchPublicBooksAPI({
        page: 1,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      if (res.status !== "success") throw new Error(res.message);

      dispatch(setLatestBooks(res.data));
    } catch (e) {
      dispatch(setLatestError(e.message));
    } finally {
      dispatch(setLatestLoading(false));
    }
  };

export const fetchActiveBookByIdAction = (bookId) => async () => {
  return await fetchActiveBookById(bookId);
};

export const fetchBookByIdAdminAction = (bookId) => async () => {
  return await fetchBookByIdAdmin(bookId);
};
