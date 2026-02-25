import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_LIMIT = 5;

const initialState = {
  loading: false,
  error: "",
  successMsg: "",
  createdReview: null,

  //catalog style
  myReviews: {
    items: [],
    pagination: { total: 0, page: 1, limit: DEFAULT_LIMIT, pages: 0 },
    lastQuery: {
      params: {
        page: 1,
        limit: DEFAULT_LIMIT,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
    loading: false,
    error: null,
  },
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reviewPending: (state) => {
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    },
    reviewFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Something went wrong";
    },
    createReviewSuccess: (state, { payload }) => {
      state.loading = false;
      state.successMsg = payload?.message || "Review created";
      state.createdReview = payload?.data?.review || payload?.data || null;
    },

    //MyReviews catalog reducers
    setMyReviewsLoading: (state, { payload }) => {
      state.myReviews.loading = payload;
    },
    setMyReviewsError: (state, { payload }) => {
      state.myReviews.error = payload;
    },
    setMyReviewsResult: (state, { payload }) => {
      const { items, pagination, params } = payload || {};
      state.myReviews.items = items || [];
      state.myReviews.pagination = pagination ?? state.myReviews.pagination;
      state.myReviews.lastQuery = {
        params: params ?? state.myReviews.lastQuery.params,
      };
    },
    setMyReviewsPage: (state, { payload }) => {
      state.myReviews.lastQuery.params.page = payload;
    },
    resetMyReviews: (state) => {
      const limit = state.myReviews.pagination?.limit || DEFAULT_LIMIT;
      state.myReviews.items = [];
      state.myReviews.loading = false;
      state.myReviews.error = null;
      state.myReviews.pagination = { total: 0, page: 1, limit, pages: 0 };
      state.myReviews.lastQuery = {
        params: { page: 1, limit, sortBy: "createdAt", sortOrder: "desc" },
      };
    },

    clearReviewStatus: (state) => {
      state.error = "";
      state.successMsg = "";
    },
  },
});

export const {
  reviewPending,
  reviewFail,
  createReviewSuccess,
  clearReviewStatus,

  setMyReviewsLoading,
  setMyReviewsError,
  setMyReviewsResult,
  setMyReviewsPage,
  resetMyReviews,
} = reviewSlice.actions;

export default reviewSlice.reducer;
