import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchMembersAdminAction,
  updateMemberStatusAdminAction,
} from "../../features/user/userAction";

import {
  resetAdminMembers,
  setAdminMembersPage,
  setAdminMembersQuery,
} from "../../features/user/userSlice";

export default function MembersManagementPage() {
  const dispatch = useDispatch();

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.userStore.adminMembers
  );

  const { page = 1, limit = 10, q = "", status = "" } = lastQuery?.params || {};
  const pages = pagination?.pages || 1;

  const [searchInput, setSearchInput] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);
  const [statusDrafts, setStatusDrafts] = useState({});

  // reset on enter
  useEffect(() => {
    dispatch(resetAdminMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // fetch based on query params in redux
  useEffect(() => {
    dispatch(fetchMembersAdminAction({ q, status, page, limit }));
  }, [dispatch, q, status, page, limit]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    // when items change, initialize drafts with current status
    const map = {};
    (items || []).forEach((u) => {
      map[u._id] = u.status || "active";
    });
    setStatusDrafts(map);
  }, [items]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setAdminMembersQuery({
        q: searchInput.trim(),
        status: statusFilter,
      })
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setAdminMembersQuery({ q: "", status: statusFilter }));
  };

  const handleUpdateStatus = async (memberId, nextStatus) => {
    const res = await dispatch(
      updateMemberStatusAdminAction(memberId, nextStatus)
    );

    if (res?.status !== "success") {
      toast.error(res?.message || "Failed to update member");
      return;
    }

    toast.success(res?.message || "Updated");
    setStatusDrafts((prev) => ({ ...prev, [memberId]: nextStatus }));
    // refresh list with same query
    dispatch(fetchMembersAdminAction({ q, status, page, limit }));
  };

  const StatusBadge = ({ value }) => {
    const cls =
      value === "active"
        ? "badge-success"
        : value === "inactive"
        ? "badge-error"
        : value === "suspended"
        ? "badge-warning"
        : "badge-ghost"; // deactivated etc

    return <span className={`badge ${cls}`}>{value}</span>;
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Members Management
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex gap-3 items-center">
          <label className="input rounded-full max-h-9 flex items-center gap-2">
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
              className="w-100"
              placeholder="Search: User ID, name, email, phone, address, role, status..."
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
                clear
              </button>
            )}
          </label>

          <select
            className="select select-bordered w-full rounded-full max-h-9"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">--- All Status ---</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="deactivated">Deactivated</option>
          </select>

          <button
            className="btn btn-primary rounded-full max-h-9"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Member"}
          </button>
        </form>
      </div>

      <hr className="my-3" />

      <div className="w-full min-w-0 max-w-full overflow-x-auto mt-4">
        <table className="table w-max min-w-[1200px]">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.length ? (
              items.map((u) => {
                const isActive = u.status === "active";
                const isInactive = u.status === "inactive";
                const isSuspended = u.status === "suspended";

                return (
                  <tr key={u._id}>
                    <td className="font-mono text-xs">{u._id}</td>
                    <td className="font-bold">{u.fName || "-"}</td>
                    <td>{u.lName || "-"}</td>
                    <td>{u.email || "-"}</td>
                    <td>{u.phone || "-"}</td>
                    <td className="max-w-[320px] whitespace-normal">
                      {u.address || "-"}
                    </td>
                    <td>{u.role || "-"}</td>
                    <td>
                      <StatusBadge value={u.status} />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          className="select select-bordered select-sm rounded-full"
                          value={statusDrafts[u._id] ?? u.status ?? "active"}
                          onChange={(e) =>
                            setStatusDrafts((prev) => ({
                              ...prev,
                              [u._id]: e.target.value,
                            }))
                          }
                          disabled={loading}
                        >
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                          <option value="suspended">suspended</option>
                          <option value="deactivated">deactivated</option>
                        </select>

                        <button
                          className="btn btn-primary btn-sm rounded-full"
                          disabled={
                            loading ||
                            (statusDrafts[u._id] ?? u.status) === u.status // disable if no change
                          }
                          onClick={() =>
                            handleUpdateStatus(u._id, statusDrafts[u._id])
                          }
                        >
                          Save
                        </button>
                      </div>

                      {/* optional small hint */}
                      {(statusDrafts[u._id] ?? u.status) !== u.status && (
                        <div className="text-xs opacity-60 mt-1 text-right">
                          Unsaved change
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center opacity-60">
                  {loading ? "Loading..." : "No members found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="btn"
          onClick={() => dispatch(setAdminMembersPage(Math.max(1, page - 1)))}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">
          Page {page}
          {/* Page {page} / {pages} */}
        </span>

        <button
          className="btn"
          onClick={() => dispatch(setAdminMembersPage(page + 1))}
          disabled={loading || page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
