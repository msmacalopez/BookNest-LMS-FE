import {
  reviewPending,
  reviewFail,
  createReviewSuccess,
  myReviewsSuccess,
} from "./reviewSlice";

import { createReview, fetchMyReviews } from "./reviewAPI";
import { fetchMyBorrowsAction } from "../borrow/borrowAction";

export const createReviewAction =
  (borrowId, reviewData) => async (dispatch) => {
    try {
      dispatch(reviewPending());

      const res = await createReview(borrowId, reviewData);

      if (res?.status !== "success") {
        dispatch(reviewFail(res?.message || "Failed to create review"));
        return null;
      }

      dispatch(createReviewSuccess(res));

      //refresh my borrows table so status becomes "reviewed"
      dispatch(fetchMyBorrowsAction());

      //refresh my reviews list
      dispatch(fetchMyReviewsAction());

      return res;
    } catch (e) {
      dispatch(reviewFail(e?.message || "Failed to create review"));
      return null;
    }
  };

export const fetchMyReviewsAction = () => async (dispatch) => {
  try {
    dispatch(reviewPending());

    const res = await fetchMyReviews();

    if (res?.status !== "success") {
      dispatch(reviewFail(res?.message || "Failed to fetch my reviews"));
      return null;
    }

    dispatch(myReviewsSuccess(res));
    return res;
  } catch (e) {
    dispatch(reviewFail(e?.message || "Failed to fetch my reviews"));
    return null;
  }
};
