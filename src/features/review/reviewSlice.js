import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  successMsg: "",
  myReviews: [],
  createdReview: null,
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
    myReviewsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.myReviews = payload?.data || [];
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
  myReviewsSuccess,
  clearReviewStatus,
} = reviewSlice.actions;

export default reviewSlice.reducer;
