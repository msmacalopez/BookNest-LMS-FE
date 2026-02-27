import {
  borrowPending,
  borrowFail,
  borrowSuccess,
  setMyBorrowsLoading,
  setMyBorrowsError,
  setMyBorrowsResult,
  setAllBorrowsLoading,
  setAllBorrowsError,
  setAllBorrowsResult,
} from "./borrowSlice";
import {
  createMyBorrow,
  fetchMyBorrows,
  fetchAllBorrows,
  adminReturnBook,
} from "./borrowAPI";

export const createMyBorrowAction = (bookId) => async (dispatch) => {
  try {
    dispatch(borrowPending());

    const res = await createMyBorrow(bookId);

    if (res?.status !== "success") {
      dispatch(borrowFail(res?.message || "Borrow failed"));
      return null;
    }

    dispatch(borrowSuccess(res));
    return res; //return response to BookDetailPage to show success message and update available copies
  } catch (e) {
    dispatch(borrowFail(e?.message || "Borrow failed"));
    return null;
  }
};

export const fetchMyBorrowsAction =
  ({ page, limit } = {}) =>
  async (dispatch) => {
    try {
      dispatch(setMyBorrowsLoading(true));
      dispatch(setMyBorrowsError(null));

      const res = await fetchMyBorrows({ page, limit });

      if (res?.status !== "success") {
        dispatch(setMyBorrowsError(res?.message || "Failed to fetch borrows"));
        dispatch(setMyBorrowsLoading(false));
        return null;
      }

      const { items, pagination, params } = res.data || {};
      dispatch(setMyBorrowsResult({ items, pagination, params }));
      dispatch(setMyBorrowsLoading(false));
      return res;
    } catch (e) {
      dispatch(setMyBorrowsError(e?.message || "Failed to fetch borrows"));
      dispatch(setMyBorrowsLoading(false));
      return null;
    }
  };

export const fetchAllBorrowsAction =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setAllBorrowsLoading(true));
      dispatch(setAllBorrowsError(null));

      const res = await fetchAllBorrows(params);

      if (res?.status !== "success") {
        dispatch(
          setAllBorrowsError(res?.message || "Failed to fetch all borrows")
        );
        dispatch(setAllBorrowsLoading(false));
        return null;
      }

      const { items, pagination, params: returnedParams } = res.data || {};
      dispatch(
        setAllBorrowsResult({ items, pagination, params: returnedParams })
      );
      dispatch(setAllBorrowsLoading(false));
      return res;
    } catch (e) {
      dispatch(setAllBorrowsError(e?.message || "Failed to fetch all borrows"));
      dispatch(setAllBorrowsLoading(false));
      return null;
    }
  };

export const adminReturnBookAction = (borrowId) => async (dispatch) => {
  try {
    const res = await adminReturnBook(borrowId);
    return res;
  } catch (e) {
    return { status: "error", message: e?.message || "Return failed" };
  }
};
