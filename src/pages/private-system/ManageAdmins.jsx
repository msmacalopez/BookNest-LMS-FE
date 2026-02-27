// ManageAdmins.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchUsersSuperAdminAction,
  deleteUserSuperAdminAction,
  bulkDeleteUsersSuperAdminAction,
} from "../../features/user/userAction";

import {
  resetAdminUsers,
  setAdminUsersPage,
  setAdminUsersQuery,
} from "../../features/user/userSlice";

export default function ManageAdmins() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore || {});
  const myId = user?._id;

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.userStore.adminUsers
  );

  const {
    page = 1,
    limit = 10,
    q = "",
    status = "",
    role = "",
  } = lastQuery?.params || {};

  const pages = pagination?.pages || 1;

  const [searchInput, setSearchInput] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);
  const [roleFilter, setRoleFilter] = useState(role);
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  useEffect(() => {
    dispatch(resetAdminUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsersSuperAdminAction({ q, status, role, page, limit }));
  }, [dispatch, q, status, role, page, limit]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [items]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const isSelf = (id) => myId && id && String(myId) === String(id);
  const isProtected = (u) => isSelf(u?._id) || u?.role === "superadmin"; //protect self + any superadmin

  const allChecked = useMemo(() => {
    if (!items?.length) return false;

    const eligible = items.filter((u) => !isProtected(u));
    if (!eligible.length) return false;

    return eligible.every((u) => selectedIds.has(u._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedIds, myId]);

  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (allChecked) return new Set();

      const next = new Set(prev);
      (items || []).forEach((u) => {
        if (!isProtected(u)) next.add(u._id);
      });
      return next;
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setAdminUsersQuery({
        q: searchInput.trim(),
        status: statusFilter,
        role: roleFilter,
      })
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(
      setAdminUsersQuery({
        q: "",
        status: statusFilter,
        role: roleFilter,
      })
    );
  };

  const refresh = (goToPage = page) => {
    dispatch(
      fetchUsersSuperAdminAction({ q, status, role, page: goToPage, limit })
    );
  };

  const handleDeleteOne = async (u) => {
    if (isProtected(u)) {
      toast.info("This user is protected and cannot be deleted here.");
      return;
    }

    const ok = window.confirm("Delete this user? This cannot be undone.");
    if (!ok) return;

    const res = await dispatch(deleteUserSuperAdminAction(u._id));
    if (res?.status === "success") {
      toast.success(res?.message || "User deleted");
      refresh();
    } else {
      toast.error(res?.message || "Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) {
      toast.info("No users selected");
      return;
    }

    const ok = window.confirm(
      `Delete ${selectedIds.size} selected user(s)? This cannot be undone.`
    );
    if (!ok) return;

    const ids = Array.from(selectedIds);
    const res = await dispatch(bulkDeleteUsersSuperAdminAction(ids));

    if (res?.status === "success") {
      toast.success(res?.message || "Selected users deleted");
      refresh(1);
    } else {
      toast.error(res?.message || "Bulk delete failed");
    }
  };

  const goPrev = () => {
    if (page <= 1) return;
    dispatch(setAdminUsersPage(page - 1));
  };

  const goNext = () => {
    if (page >= pages) return;
    dispatch(setAdminUsersPage(page + 1));
  };

  const StatusBadge = ({ value }) => {
    const cls =
      value === "active"
        ? "badge-success"
        : value === "inactive"
        ? "badge-error"
        : value === "suspended"
        ? "badge-warning"
        : "badge-ghost";
    return <span className={`badge ${cls}`}>{value}</span>;
  };

  const RoleBadge = ({ value }) => {
    const cls =
      value === "admin"
        ? "badge-info"
        : value === "member"
        ? "badge-info badge-outline"
        : "badge-neutral";
    return <span className={`badge ${cls}`}>{value}</span>;
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        {/* LEFT: Title */}
        <div className="space-y-1">
          <h1 className="text-primary text-2xl font-bold leading-tight whitespace-nowrap">
            Users Management
          </h1>
          <p className="text-sm opacity-70">Search and filter.</p>
        </div>

        {/* RIGHT: Actions + Filters */}
        <div className="w-full lg:w-auto flex flex-col gap-2">
          {/* Top row actions */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Link
              to="/dashboard/users/new"
              className="btn btn-success btn-sm rounded-full"
            >
              + Add Staff / Member
            </Link>

            <button
              className="btn btn-error btn-sm rounded-full"
              onClick={handleBulkDelete}
              disabled={selectedIds.size === 0 || loading}
              title={selectedIds.size === 0 ? "Select users first" : ""}
            >
              Delete Selections
            </button>
          </div>

          {/* Filter row */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-3"
          >
            {/* Search input */}
            <label className="input input-bordered input-sm rounded-full flex items-center gap-2 w-full md:flex-1">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>

              <input
                type="search"
                className="w-full"
                placeholder="Search: ID, name, email, phone, address..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              {!!searchInput && (
                <button
                  type="button"
                  className="btn btn-ghost btn-xs rounded-full"
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </label>

            {/* Dropdowns */}
            <select
              className="select select-bordered select-sm rounded-full w-full md:w-52"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="member">Member</option>
              <option value="admin">Librarian</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <select
              className="select select-bordered select-sm rounded-full w-full md:w-52"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="deactivated">Deactivated</option>
            </select>

            {/* Search button */}
            <button
              className="btn btn-primary btn-sm rounded-full w-full md:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Searching
                </>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
      </div>

      <hr className="my-3" />

      <div className="w-full min-w-0 max-w-full overflow-x-auto mt-4">
        <table className="table w-max min-w-[1100px]">
          <thead>
            <tr>
              <th>
                <label className="flex items-center gap-2">
                  <span>All</span>
                  <input
                    type="checkbox"
                    className="checkbox w-4 h-4"
                    checked={allChecked}
                    onChange={toggleAll}
                    disabled={!items?.length}
                    title="Select all eligible users (excludes yourself and superadmins)"
                  />
                </label>
              </th>
              <th>Actions</th>
              <th>Email</th>
              <th>User ID</th>
              <th>Role</th>
              <th>Status</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {!loading && (!items || items.length === 0) && (
              <tr>
                <td colSpan={10} className="text-center py-8 opacity-70">
                  No users found.
                </td>
              </tr>
            )}

            {(items || []).map((u) => {
              const protectedRow = isProtected(u);

              return (
                <tr key={u._id} className={protectedRow ? "opacity-90" : ""}>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4"
                      checked={selectedIds.has(u._id)}
                      onChange={() => toggleOne(u._id)}
                      disabled={protectedRow}
                      title={
                        protectedRow
                          ? "Protected account (cannot select)"
                          : "Select user"
                      }
                    />
                  </th>

                  <td>
                    <div className="flex gap-2">
                      {!protectedRow ? (
                        <Link
                          to={`/dashboard/users/${u._id}/edit`}
                          className="btn btn-warning btn-sm rounded-full"
                        >
                          Edit
                        </Link>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm rounded-full"
                          disabled
                          title="You can't edit this account from this panel"
                        >
                          Edit
                        </button>
                      )}

                      {/* Optional single delete */}
                      {/* {!protectedRow && (
                        <button
                          className="btn btn-error btn-sm rounded-full"
                          onClick={() => handleDeleteOne(u)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      )} */}
                    </div>
                  </td>

                  <td>{u.email || "-"}</td>
                  <td className="font-mono text-xs">{u._id}</td>
                  <td>
                    <RoleBadge value={u.role} />
                  </td>
                  <td>
                    <StatusBadge value={u.status} />
                  </td>

                  <td className="font-bold">
                    {u.fName || "-"}{" "}
                    {protectedRow && (
                      <span className="ml-2 badge badge-outline badge-sm">
                        Protected
                      </span>
                    )}
                  </td>
                  <td>{u.lName || "-"}</td>
                  <td>{u.phone || "-"}</td>
                  <td className="max-w-[320px] whitespace-normal">
                    {u.address || "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="btn"
          onClick={goPrev}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2 opacity-70">
          Page {page}
          {/* Page {page} / {pages} */}
        </span>

        <button
          className="btn"
          onClick={goNext}
          disabled={page >= pages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
