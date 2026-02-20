import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllActiveBooks,
  fetchActiveBookById,
  fetchAdminAllBooks,
  fetchBookByIdAdmin,
} from "./bookAPI";

const extractList = (res) => {
  return res?.books ?? res?.result ?? res?.data ?? [];
};

const extractOne = (res) => {
  return res?.book ?? res?.result ?? res?.data ?? res;
};

// ✅ Catalog (AllBooks)
export const fetchCatalogBooks = createAsyncThunk(
  "books/fetchCatalogBooks",
  async ({ q = "", page = 1, limit = 12 } = {}, { rejectWithValue }) => {
    const res = await fetchAllActiveBooks({ q, page, limit });
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load books");
    return { list: extractList(res), meta: res, q, page, limit };
  }
);

// ✅ Latest additions (Home)
export const fetchLatestBooks = createAsyncThunk(
  "books/fetchLatestBooks",
  async ({ limit = 6 } = {}, { rejectWithValue }) => {
    // Just fetch page 1, limit N.
    // If you later add backend sort, we’ll adjust here.
    const res = await fetchAllActiveBooks({ q: "", page: 1, limit });
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load latest books");
    return { list: extractList(res), meta: res };
  }
);

// ✅ Popular books (Home)
export const fetchPopularBooks = createAsyncThunk(
  "books/fetchPopularBooks",
  async ({ limit = 6 } = {}, { rejectWithValue }) => {
    // If you later create /books/popular, replace this with that.
    const res = await fetchAllActiveBooks({ q: "", page: 1, limit });
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load popular books");
    return { list: extractList(res), meta: res };
  }
);

// ✅ One public active book
export const fetchActiveBook = createAsyncThunk(
  "books/fetchActiveBook",
  async (bookId, { rejectWithValue }) => {
    const res = await fetchActiveBookById(bookId);
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load book");
    return extractOne(res);
  }
);

// ✅ Admin list
export const fetchAdminBooks = createAsyncThunk(
  "books/fetchAdminBooks",
  async ({ q = "", page = 1, limit = 12 } = {}, { rejectWithValue }) => {
    const res = await fetchAdminAllBooks({ q, page, limit });
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load admin books");
    return { list: extractList(res), meta: res, q, page, limit };
  }
);

// ✅ Admin check 1 book
export const fetchAdminBook = createAsyncThunk(
  "books/fetchActiveBook",
  async (bookId, { rejectWithValue }) => {
    const res = await fetchBookByIdAdmin(bookId);
    if (res?.status === "error")
      return rejectWithValue(res?.message || "Failed to load book");
    return extractOne(res);
  }
);

const initialState = {
  catalog: {
    items: [],
    q: "",
    page: 1,
    limit: 12,
    loading: false,
    error: "",
    meta: null, // keep pagination info if backend provides
  },
  latest: {
    items: [],
    loading: false,
    error: "",
    meta: null,
  },
  popular: {
    items: [],
    loading: false,
    error: "",
    meta: null,
  },
  activeBook: {
    item: null,
    loading: false,
    error: "",
  },
  admin: {
    items: [],
    q: "",
    page: 1,
    limit: 12,
    loading: false,
    error: "",
    meta: null,
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCatalogQuery: (state, action) => {
      state.catalog.q = action.payload;
    },
    setCatalogPage: (state, action) => {
      state.catalog.page = action.payload;
    },
    clearActiveBook: (state) => {
      state.activeBook.item = null;
      state.activeBook.error = "";
      state.activeBook.loading = false;
    },
  },
  extraReducers: (builder) => {
    // catalog
    builder
      .addCase(fetchCatalogBooks.pending, (state) => {
        state.catalog.loading = true;
        state.catalog.error = "";
      })
      .addCase(fetchCatalogBooks.fulfilled, (state, action) => {
        state.catalog.loading = false;
        state.catalog.items = Array.isArray(action.payload.list)
          ? action.payload.list
          : [];
        state.catalog.meta = action.payload.meta || null;
        state.catalog.q = action.payload.q;
        state.catalog.page = action.payload.page;
        state.catalog.limit = action.payload.limit;
      })
      .addCase(fetchCatalogBooks.rejected, (state, action) => {
        state.catalog.loading = false;
        state.catalog.error = action.payload || action.error.message;
        state.catalog.items = [];
      });

    // latest
    builder
      .addCase(fetchLatestBooks.pending, (state) => {
        state.latest.loading = true;
        state.latest.error = "";
      })
      .addCase(fetchLatestBooks.fulfilled, (state, action) => {
        state.latest.loading = false;
        state.latest.items = Array.isArray(action.payload.list)
          ? action.payload.list
          : [];
        state.latest.meta = action.payload.meta || null;
      })
      .addCase(fetchLatestBooks.rejected, (state, action) => {
        state.latest.loading = false;
        state.latest.error = action.payload || action.error.message;
        state.latest.items = [];
      });

    // popular
    builder
      .addCase(fetchPopularBooks.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = "";
      })
      .addCase(fetchPopularBooks.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.items = Array.isArray(action.payload.list)
          ? action.payload.list
          : [];
        state.popular.meta = action.payload.meta || null;
      })
      .addCase(fetchPopularBooks.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.payload || action.error.message;
        state.popular.items = [];
      });

    // activeBook
    builder
      .addCase(fetchActiveBook.pending, (state) => {
        state.activeBook.loading = true;
        state.activeBook.error = "";
      })
      .addCase(fetchActiveBook.fulfilled, (state, action) => {
        state.activeBook.loading = false;
        state.activeBook.item = action.payload || null;
      })
      .addCase(fetchActiveBook.rejected, (state, action) => {
        state.activeBook.loading = false;
        state.activeBook.error = action.payload || action.error.message;
        state.activeBook.item = null;
      });

    // admin
    builder
      .addCase(fetchAdminBooks.pending, (state) => {
        state.admin.loading = true;
        state.admin.error = "";
      })
      .addCase(fetchAdminBooks.fulfilled, (state, action) => {
        state.admin.loading = false;
        state.admin.items = Array.isArray(action.payload.list)
          ? action.payload.list
          : [];
        state.admin.meta = action.payload.meta || null;
        state.admin.q = action.payload.q;
        state.admin.page = action.payload.page;
        state.admin.limit = action.payload.limit;
      })
      .addCase(fetchAdminBooks.rejected, (state, action) => {
        state.admin.loading = false;
        state.admin.error = action.payload || action.error.message;
        state.admin.items = [];
      });
  },
});

export const { setCatalogQuery, setCatalogPage, clearActiveBook } =
  bookSlice.actions;
export default bookSlice.reducer;
