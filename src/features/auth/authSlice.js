import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
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
  },
});

export const { reducer, actions } = authSlice;
export const { setUser, logOut } = actions;
export default reducer;
