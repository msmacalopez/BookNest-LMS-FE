import {
  setAllHoldsLoading,
  setAllHoldsError,
  setAllHoldsResult,
  setMyHoldsLoading,
  setMyHoldsError,
  setMyHoldsResult,
} from "./holdSlice";

import {
  fetchAllHolds,
  fetchMyHolds,
  cancelMyHold,
  adminFulfillHold,
  createMyHold,
} from "./holdAPI";

// ADMIN
export const fetchAllHoldsAction =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setAllHoldsLoading(true));
      dispatch(setAllHoldsError(null));

      const res = await fetchAllHolds(params);

      if (res?.status !== "success") {
        dispatch(setAllHoldsError(res?.message || "Failed to fetch holds"));
        dispatch(setAllHoldsLoading(false));
        return null;
      }

      const { items, pagination, params: returnedParams } = res.data || {};
      dispatch(
        setAllHoldsResult({
          items,
          pagination,
          params: returnedParams || params,
        })
      );

      dispatch(setAllHoldsLoading(false));
      return res;
    } catch (e) {
      dispatch(setAllHoldsError(e?.message || "Failed to fetch holds"));
      dispatch(setAllHoldsLoading(false));
      return null;
    }
  };

// MEMBER
export const fetchMyHoldsAction =
  ({ page, limit } = {}) =>
  async (dispatch) => {
    try {
      dispatch(setMyHoldsLoading(true));
      dispatch(setMyHoldsError(null));

      const res = await fetchMyHolds({ page, limit });

      if (res?.status !== "success") {
        dispatch(setMyHoldsError(res?.message || "Failed to fetch holds"));
        dispatch(setMyHoldsLoading(false));
        return null;
      }

      const { items, pagination, params } = res.data || {};
      dispatch(setMyHoldsResult({ items, pagination, params }));

      dispatch(setMyHoldsLoading(false));
      return res;
    } catch (e) {
      dispatch(setMyHoldsError(e?.message || "Failed to fetch holds"));
      dispatch(setMyHoldsLoading(false));
      return null;
    }
  };

// MEMBER cancel
export const cancelMyHoldAction = (holdId) => async () => {
  try {
    return await cancelMyHold(holdId);
  } catch (e) {
    return { status: "error", message: e?.message || "Cancel failed" };
  }
};

// ADMIN fulfill
export const adminFulfillHoldAction = (holdId) => async () => {
  try {
    return await adminFulfillHold(holdId);
  } catch (e) {
    return { status: "error", message: e?.message || "Fulfill failed" };
  }
};

// MEMBER create hold
export const createMyHoldAction = (bookId) => async () => {
  try {
    return await createMyHold(bookId);
  } catch (e) {
    return {
      status: "error",
      message: e?.message || "Failed to create hold",
    };
  }
};
