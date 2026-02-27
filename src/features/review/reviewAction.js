import {
  reviewPending,
  reviewFail,
  createReviewSuccess,
  setMyReviewsLoading,
  setMyReviewsError,
  setMyReviewsResult,
  setAllReviewsLoading,
  setAllReviewsError,
  setAllReviewsResult,
} from "./reviewSlice";

import {
  createReview,
  fetchMyReviews,
  fetchAllReviews,
  adminUpdateReviewStatus,
} from "./reviewAPI";
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

export const fetchMyReviewsAction =
  ({ page = 1, limit = 10 } = {}) =>
  async (dispatch) => {
    try {
      dispatch(setMyReviewsLoading(true));
      dispatch(setMyReviewsError(null));

      const res = await fetchMyReviews({ page, limit });

      if (res?.status !== "success") {
        dispatch(
          setMyReviewsError(res?.message || "Failed to fetch my reviews")
        );
        dispatch(setMyReviewsLoading(false));
        return null;
      }

      const { items, pagination, params } = res.data || {};
      dispatch(setMyReviewsResult({ items, pagination, params }));

      dispatch(setMyReviewsLoading(false));
      return res;
    } catch (e) {
      dispatch(setMyReviewsError(e?.message || "Failed to fetch my reviews"));
      dispatch(setMyReviewsLoading(false));
      return null;
    }
  };

export const fetchAllReviewsAction =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setAllReviewsLoading(true));
      dispatch(setAllReviewsError(null));

      const res = await fetchAllReviews(params);

      if (res?.status !== "success") {
        dispatch(
          setAllReviewsError(res?.message || "Failed to fetch all reviews")
        );
        dispatch(setAllReviewsLoading(false));
        return null;
      }

      const { items, pagination, params: returnedParams } = res.data || {};
      dispatch(
        setAllReviewsResult({ items, pagination, params: returnedParams })
      );
      dispatch(setAllReviewsLoading(false));
      return res;
    } catch (e) {
      dispatch(setAllReviewsError(e?.message || "Failed to fetch all reviews"));
      dispatch(setAllReviewsLoading(false));
      return null;
    }
  };

export const adminUpdateReviewStatusAction = (reviewId, status) => async () => {
  try {
    const res = await adminUpdateReviewStatus(reviewId, status);
    return res;
  } catch (e) {
    return {
      status: "error",
      message: e?.message || "Failed to update review",
    };
  }
};
