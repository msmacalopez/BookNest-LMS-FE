import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_LIMIT = 10;

const initialState = {
  // admin -> members list
  adminMembers: {
    items: [],
    loading: false,
    error: null,
    pagination: { total: 0, page: 1, limit: DEFAULT_LIMIT, pages: 0 },
    lastQuery: { params: { q: "", status: "", page: 1, limit: DEFAULT_LIMIT } },
  },
  //superadmin -> users list
  adminUsers: {
    items: [],
    loading: false,
    error: null,
    pagination: { total: 0, page: 1, limit: 10, pages: 0 },
    lastQuery: { params: { q: "", status: "", role: "", page: 1, limit: 10 } },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdminMembersLoading: (state, { payload }) => {
      state.adminMembers.loading = payload;
    },
    setAdminMembersError: (state, { payload }) => {
      state.adminMembers.error = payload;
    },
    setAdminMembersResult: (state, { payload }) => {
      const { items, pagination, params } = payload || {};
      state.adminMembers.items = items || [];
      state.adminMembers.pagination =
        pagination ?? state.adminMembers.pagination;
      state.adminMembers.lastQuery = {
        params: params ?? state.adminMembers.lastQuery.params,
      };
    },
    setAdminMembersPage: (state, { payload }) => {
      state.adminMembers.lastQuery.params.page = payload;
    },
    setAdminMembersQuery: (state, { payload }) => {
      state.adminMembers.lastQuery.params.q =
        payload?.q ?? state.adminMembers.lastQuery.params.q;

      state.adminMembers.lastQuery.params.status =
        payload?.status ?? state.adminMembers.lastQuery.params.status;

      state.adminMembers.lastQuery.params.page = 1; // reset page on new search
    },
    resetAdminMembers: (state) => {
      const limit = state.adminMembers.pagination?.limit || DEFAULT_LIMIT;
      state.adminMembers.items = [];
      state.adminMembers.loading = false;
      state.adminMembers.error = null;
      state.adminMembers.pagination = { total: 0, page: 1, limit, pages: 0 };
      state.adminMembers.lastQuery = {
        params: { q: "", status: "", page: 1, limit },
      };
    },

    //superadmins:
    setAdminUsersLoading: (state, { payload }) => {
      state.adminUsers.loading = payload;
    },
    setAdminUsersError: (state, { payload }) => {
      state.adminUsers.error = payload;
    },
    setAdminUsersResult: (state, { payload }) => {
      const { items, pagination, params } = payload || {};
      state.adminUsers.items = items || [];
      state.adminUsers.pagination = pagination ?? state.adminUsers.pagination;
      state.adminUsers.lastQuery = {
        params: params ?? state.adminUsers.lastQuery.params,
      };
    },
    setAdminUsersPage: (state, { payload }) => {
      state.adminUsers.lastQuery.params.page = payload;
    },
    setAdminUsersQuery: (state, { payload }) => {
      state.adminUsers.lastQuery.params.q =
        payload?.q ?? state.adminUsers.lastQuery.params.q;
      state.adminUsers.lastQuery.params.status =
        payload?.status ?? state.adminUsers.lastQuery.params.status;
      state.adminUsers.lastQuery.params.role =
        payload?.role ?? state.adminUsers.lastQuery.params.role;
      state.adminUsers.lastQuery.params.page = 1;
    },
    resetAdminUsers: (state) => {
      const limit = state.adminUsers.pagination?.limit || 10;
      state.adminUsers.items = [];
      state.adminUsers.loading = false;
      state.adminUsers.error = null;
      state.adminUsers.pagination = { total: 0, page: 1, limit, pages: 0 };
      state.adminUsers.lastQuery = {
        params: { q: "", status: "", role: "", page: 1, limit },
      };
    },
  },
});

export const {
  setAdminMembersLoading,
  setAdminMembersError,
  setAdminMembersResult,
  setAdminMembersPage,
  setAdminMembersQuery,
  resetAdminMembers,
  setAdminUsersLoading,
  setAdminUsersError,
  setAdminUsersResult,
  setAdminUsersPage,
  setAdminUsersQuery,
  resetAdminUsers,
} = userSlice.actions;

export default userSlice.reducer;
