import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      (state.user = null),
        sessionStorage.removeItem("accessJWT"),
        localStorage.removeItem("refreshJWT");
    },
    setAuthReady: (state, action) => {
      state.isAuthReady = action.payload;
    },
  },
});

export const { reducer, actions } = authSlice;
export const { setUser, logOut, setAuthReady } = actions;
export default reducer;
