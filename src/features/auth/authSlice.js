// create a authSlice. name is auth and initial state have user property
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
  },
});

export const { reducer, actions } = authSlice;
export const { setUser } = actions;
export default reducer;
