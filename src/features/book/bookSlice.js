// bookSlice.js
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_LIMIT = 12;

const initialState = {
  // homepage
  popular: {
    items: [],
    loading: false,
    error: null,
  },
  latest: {
    items: [],
    loading: false,
    error: null,
  },

  // All Books Page
  catalog: {
    items: [],
    pagination: { total: 0, page: 1, limit: DEFAULT_LIMIT, pages: 0 },
    loading: false,
    error: null,
    lastQuery: {
      mode: "public",
      params: {
        q: "",
        page: 1,
        limit: DEFAULT_LIMIT,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // -----------------------------
    // CATALOG (AllBooksPage)
    // -----------------------------
    setCatalogLoading: (s, a) => {
      s.catalog.loading = a.payload;
    },
    setCatalogError: (s, a) => {
      s.catalog.error = a.payload;
    },
    setCatalogSearchResult: (s, a) => {
      const { items, pagination, mode, params } = a.payload;
      s.catalog.items = items;
      s.catalog.pagination = pagination ?? s.catalog.pagination;
      s.catalog.lastQuery = {
        mode: mode ?? "public",
        params: params ?? s.catalog.lastQuery.params,
      };
    },

    setCatalogPage: (s, a) => {
      s.catalog.lastQuery.params.page = a.payload;
    },
    setCatalogQuery: (s, a) => {
      s.catalog.lastQuery.params.q = a.payload;
    },
    setCatalogLimit: (s, a) => {
      s.catalog.lastQuery.params.limit = a.payload;
      s.catalog.pagination.limit = a.payload;
    },

    resetCatalog: (s) => {
      const limit = s.catalog.pagination?.limit || DEFAULT_LIMIT;

      s.catalog.items = [];
      s.catalog.loading = false;
      s.catalog.error = null;
      s.catalog.pagination = { total: 0, page: 1, limit, pages: 0 };
      s.catalog.lastQuery = {
        mode: "public",
        params: {
          q: "",
          page: 1,
          limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      };
    },

    // Used by navbar when clicking "Books"
    resetCatalogInNavbar: (s) => {
      const limit = s.catalog.pagination?.limit || DEFAULT_LIMIT;

      s.catalog.items = [];
      s.catalog.loading = false;
      s.catalog.error = null;
      s.catalog.pagination = { total: 0, page: 1, limit, pages: 0 };
      s.catalog.lastQuery = {
        mode: "public",
        params: {
          q: "",
          page: 1,
          limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      };
    },

    // -----------------------------
    // POPULAR (Homepage)
    // -----------------------------
    setPopularLoading: (s, a) => {
      s.popular.loading = a.payload;
    },
    setPopularError: (s, a) => {
      s.popular.error = a.payload;
    },
    setPopularBooks: (s, a) => {
      s.popular.items = a.payload;
    },

    // -----------------------------
    // LATEST (Homepage)
    // -----------------------------
    setLatestLoading: (s, a) => {
      s.latest.loading = a.payload;
    },
    setLatestError: (s, a) => {
      s.latest.error = a.payload;
    },
    setLatestBooks: (s, a) => {
      s.latest.items = a.payload;
    },
  },
});

export const {
  // catalog
  setCatalogLoading,
  setCatalogError,
  setCatalogSearchResult,
  setCatalogPage,
  setCatalogQuery,
  setCatalogLimit,
  resetCatalog,
  resetCatalogInNavbar,

  // homepage
  setPopularLoading,
  setPopularError,
  setPopularBooks,
  setLatestLoading,
  setLatestError,
  setLatestBooks,
} = bookSlice.actions;

export default bookSlice.reducer;
