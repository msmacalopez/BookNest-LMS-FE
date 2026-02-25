import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_LIMIT = 5;

const initialState = {
  // keep your existing top-level flags for create-borrow etc.
  loading: false,
  error: "",
  successMsg: "",
  createdBorrow: null,

  // for pagination: make myBorrows consistent with bookSlice.catalog
  myBorrows: {
    items: [],
    pagination: { total: 0, page: 1, limit: DEFAULT_LIMIT, pages: 0 },
    lastQuery: {
      params: {
        page: 1,
        limit: DEFAULT_LIMIT,
        sortBy: "borrowDate",
        sortOrder: "desc",
      },
    },
  },
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    // -----------------------------
    // General (create borrow etc.)
    // -----------------------------
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

    // -----------------------------
    // My Borrows (catalog-style)
    // -----------------------------
    setMyBorrowsLoading: (state, { payload }) => {
      state.myBorrows.loading = payload;
    },
    setMyBorrowsError: (state, { payload }) => {
      state.myBorrows.error = payload;
    },

    // payload expected:
    // { items, pagination, params }
    setMyBorrowsResult: (state, { payload }) => {
      const { items, pagination, params } = payload || {};

      state.myBorrows.items = items || [];
      state.myBorrows.pagination = pagination ?? state.myBorrows.pagination;

      state.myBorrows.lastQuery = {
        params: params ?? state.myBorrows.lastQuery.params,
      };
    },

    setMyBorrowsPage: (state, { payload }) => {
      state.myBorrows.lastQuery.params.page = payload;
    },

    setMyBorrowsLimit: (state, { payload }) => {
      state.myBorrows.lastQuery.params.limit = payload;
      state.myBorrows.pagination.limit = payload;
    },

    resetMyBorrows: (state) => {
      const limit = state.myBorrows.pagination?.limit || DEFAULT_LIMIT;

      state.myBorrows.items = [];
      state.myBorrows.loading = false;
      state.myBorrows.error = null;
      state.myBorrows.pagination = { total: 0, page: 1, limit, pages: 0 };
      state.myBorrows.lastQuery = {
        params: {
          page: 1,
          limit,
          sortBy: "borrowDate",
          sortOrder: "desc",
        },
      };
    },

    // keep your helper
    clearBorrowStatus: (state) => {
      state.error = "";
      state.successMsg = "";
    },
  },
});

export const {
  // existing
  borrowPending,
  borrowFail,
  borrowSuccess,
  clearBorrowStatus,

  // new catalog-style
  setMyBorrowsLoading,
  setMyBorrowsError,
  setMyBorrowsResult,
  setMyBorrowsPage,
  setMyBorrowsLimit,
  resetMyBorrows,
} = borrowSlice.actions;

export default borrowSlice.reducer;
