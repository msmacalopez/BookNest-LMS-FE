import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice.js";
import bookReducer from "../features/book/bookSlice";
import borrowReducer from "../features/borrow/borrowSlice";
import reviewReducer from "../features/review/reviewSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    bookStore: bookReducer,
    borrowStore: borrowReducer,
    reviewStore: reviewReducer,
    userStore: userReducer,
  },
});
//NOW: authStore, bookStore, borrowStore, reviewStore are available in the whole app.

export default store;
