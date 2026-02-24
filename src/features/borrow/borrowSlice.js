import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  successMsg: "",
  myBorrows: [],
  createdBorrow: null,
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    borrowPending: (state) => {
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    },
    borrowFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Something went wrong";
    },
    borrowSuccess: (state, { payload }) => {
      state.loading = false;
      state.successMsg = payload?.message || "Success";
      state.createdBorrow = payload?.data || null;
    },

    myBorrowsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.myBorrows = payload?.data || [];
    },

    clearBorrowStatus: (state) => {
      state.error = "";
      state.successMsg = "";
    },
  },
});

export const {
  borrowPending,
  borrowFail,
  borrowSuccess,
  myBorrowsSuccess,
  clearBorrowStatus,
} = borrowSlice.actions;

export default borrowSlice.reducer;
