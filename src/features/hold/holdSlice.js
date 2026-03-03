import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_LIMIT = 10;
const MY_DEFAULT_LIMIT = 5;

const initialState = {
  // admin list
  allHolds: {
    items: [],
    loading: false,
    error: null,
    pagination: { total: 0, page: 1, limit: DEFAULT_LIMIT, pages: 0 },
    lastQuery: { params: { q: "", status: "", page: 1, limit: DEFAULT_LIMIT } },
  },

  // member list
  myHolds: {
    items: [],
    loading: false,
    error: null,
    pagination: { total: 0, page: 1, limit: MY_DEFAULT_LIMIT, pages: 0 },
    lastQuery: { params: { page: 1, limit: MY_DEFAULT_LIMIT } },
  },
};

const holdSlice = createSlice({
  name: "hold",
  initialState,
  reducers: {
    // -----------------------------
    // Admin All Holds
    // -----------------------------
    setAllHoldsLoading: (s, a) => {
      s.allHolds.loading = a.payload;
    },
    setAllHoldsError: (s, a) => {
      s.allHolds.error = a.payload;
    },
    setAllHoldsResult: (s, a) => {
      const { items, pagination, params } = a.payload || {};
      s.allHolds.items = items || [];
      s.allHolds.pagination = pagination ?? s.allHolds.pagination;
      s.allHolds.lastQuery = {
        params: params ?? s.allHolds.lastQuery.params,
      };
    },
    setAllHoldsPage: (s, a) => {
      s.allHolds.lastQuery.params.page = a.payload;
    },
    setAllHoldsQuery: (s, a) => {
      s.allHolds.lastQuery.params.q =
        a.payload?.q ?? s.allHolds.lastQuery.params.q;
      s.allHolds.lastQuery.params.status =
        a.payload?.status ?? s.allHolds.lastQuery.params.status;
      s.allHolds.lastQuery.params.page = 1; // reset to first page
    },
    resetAllHolds: (s) => {
      const limit = s.allHolds.pagination?.limit || DEFAULT_LIMIT;
      s.allHolds.items = [];
      s.allHolds.loading = false;
      s.allHolds.error = null;
      s.allHolds.pagination = { total: 0, page: 1, limit, pages: 0 };
      s.allHolds.lastQuery = { params: { q: "", status: "", page: 1, limit } };
    },

    // -----------------------------
    // Member My Holds
    // -----------------------------
    setMyHoldsLoading: (s, a) => {
      s.myHolds.loading = a.payload;
    },
    setMyHoldsError: (s, a) => {
      s.myHolds.error = a.payload;
    },
    setMyHoldsResult: (s, a) => {
      const { items, pagination, params } = a.payload || {};
      s.myHolds.items = items || [];
      s.myHolds.pagination = pagination ?? s.myHolds.pagination;
      s.myHolds.lastQuery = { params: params ?? s.myHolds.lastQuery.params };
    },
    setMyHoldsPage: (s, a) => {
      s.myHolds.lastQuery.params.page = a.payload;
    },
    resetMyHolds: (s) => {
      const limit = s.myHolds.pagination?.limit || MY_DEFAULT_LIMIT;
      s.myHolds.items = [];
      s.myHolds.loading = false;
      s.myHolds.error = null;
      s.myHolds.pagination = { total: 0, page: 1, limit, pages: 0 };
      s.myHolds.lastQuery = { params: { page: 1, limit } };
    },
  },
});

export const {
  // admin
  setAllHoldsLoading,
  setAllHoldsError,
  setAllHoldsResult,
  setAllHoldsPage,
  setAllHoldsQuery,
  resetAllHolds,

  // member any
  setMyHoldsLoading,
  setMyHoldsError,
  setMyHoldsResult,
  setMyHoldsPage,
  resetMyHolds,
} = holdSlice.actions;

export default holdSlice.reducer;
