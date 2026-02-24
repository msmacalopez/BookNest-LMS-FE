import {
  borrowPending,
  borrowFail,
  borrowSuccess,
  myBorrowsSuccess,
} from "./borrowSlice";
import { createMyBorrow, fetchMyBorrows } from "./borrowAPI";

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

export const fetchMyBorrowsAction = () => async (dispatch) => {
  try {
    dispatch(borrowPending());

    const res = await fetchMyBorrows();

    if (res?.status !== "success") {
      return dispatch(
        borrowFail(res?.message || "Failed to load borrow history")
      );
    }

    dispatch(myBorrowsSuccess(res));
  } catch (e) {
    dispatch(borrowFail(e?.message || "Failed to load borrow history"));
  }
};
