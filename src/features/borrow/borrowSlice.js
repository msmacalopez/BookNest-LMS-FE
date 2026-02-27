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
  //admin fetch
  allBorrows: {
    items: [],
    loading: false,
    error: null,
    pagination: { total: 0, page: 1, limit: 10, pages: 0 },
    lastQuery: {
      params: { q: "", status: "", page: 1, limit: 10 },
    },
  },
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    // -----------------------------
    // General (create borrow,...)
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

    // -----------------------------
    // Admin All Borrows (catalog style)
    // -----------------------------
    setAllBorrowsLoading: (state, { payload }) => {
      state.allBorrows.loading = payload;
    },
    setAllBorrowsError: (state, { payload }) => {
      state.allBorrows.error = payload;
    },
    setAllBorrowsResult: (state, { payload }) => {
      const { items, pagination, params } = payload || {};
      state.allBorrows.items = items || [];
      state.allBorrows.pagination = pagination ?? state.allBorrows.pagination;
      state.allBorrows.lastQuery = {
        params: params ?? state.allBorrows.lastQuery.params,
      };
    },
    setAllBorrowsPage: (state, { payload }) => {
      state.allBorrows.lastQuery.params.page = payload;
    },
    setAllBorrowsQuery: (state, { payload }) => {
      // payload: { q, status }
      state.allBorrows.lastQuery.params.q =
        payload?.q ?? state.allBorrows.lastQuery.params.q;
      state.allBorrows.lastQuery.params.status =
        payload?.status ?? state.allBorrows.lastQuery.params.status;
      state.allBorrows.lastQuery.params.page = 1; // ✅ reset to first page when searching/filtering
    },
    resetAllBorrows: (state) => {
      const limit = state.allBorrows.pagination?.limit || 10;
      state.allBorrows.items = [];
      state.allBorrows.loading = false;
      state.allBorrows.error = null;
      state.allBorrows.pagination = { total: 0, page: 1, limit, pages: 0 };
      state.allBorrows.lastQuery = {
        params: { q: "", status: "", page: 1, limit },
      };
    },
  },
});

export const {
  // existing
  borrowPending,
  borrowFail,
  borrowSuccess,
  clearBorrowStatus,

  //my borrows - catalog-style
  setMyBorrowsLoading,
  setMyBorrowsError,
  setMyBorrowsResult,
  setMyBorrowsPage,
  setMyBorrowsLimit,
  resetMyBorrows,

  // admin all borrows
  setAllBorrowsLoading,
  setAllBorrowsError,
  setAllBorrowsResult,
  setAllBorrowsPage,
  setAllBorrowsQuery,
  resetAllBorrows,
} = borrowSlice.actions;

export default borrowSlice.reducer;
