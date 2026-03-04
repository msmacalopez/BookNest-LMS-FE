// Holds.jsx (ADMIN)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchAllHoldsAction,
  adminFulfillHoldAction,
} from "../../features/hold/holdAction";

import {
  resetAllHolds,
  setAllHoldsPage,
  setAllHoldsQuery,
} from "../../features/hold/holdSlice";

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("en-AU");
};

export default function HoldsManagement() {
  const dispatch = useDispatch();

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.holdStore.allHolds
  );

  const { page = 1, limit = 10, q = "", status = "" } = lastQuery?.params || {};
  const pages = pagination?.pages || 1;

  const [searchInput, setSearchInput] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);

  useEffect(() => {
    dispatch(resetAllHolds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllHoldsAction({ q, status, page, limit }));
  }, [dispatch, q, status, page, limit]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setAllHoldsQuery({ q: searchInput.trim(), status: statusFilter }));
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setAllHoldsQuery({ q: "", status: statusFilter }));
  };

  const handleFulfill = async (holdId) => {
    const res = await dispatch(adminFulfillHoldAction(holdId));
    if (res?.status !== "success") {
      toast.error(res?.message || "Failed to fulfill hold");
      return;
    }
    toast.success(res?.message || "Hold fulfilled");
    dispatch(fetchAllHoldsAction({ q, status, page, limit }));
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Holds by Members
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
              placeholder="Search by title, ISBN, member email..."
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
            <option value="fulfilled">Fulfilled</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            className="btn btn-primary rounded-full max-h-9"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Holds"}
          </button>
        </form>
      </div>

      <hr className="my-3" />

      <div className="w-full min-w-0 max-w-full overflow-x-auto mt-4">
        <table className="table w-max min-w-[1200px]">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Member Email</th>
              <th>Hold Date</th>
              <th>Expires At</th>
              <th>Updated At</th>
              <th>Fulfilled By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.length ? (
              items.map((h) => {
                const title = h.bookTitle || h.bookId?.title || "N/A";
                const author = h.bookAuthor || h.bookId?.author || "N/A";
                const isbn = h.bookIsbn || h.bookId?.isbn || "-";
                const memberEmail = h.memberEmail || h.userId?.email || "-";

                const fulfilledBy =
                  h.fulfilledByEmail ||
                  h.fulfilledById?.email ||
                  h.updatedByEmail ||
                  "-";

                const holdDate = h.holdDate || h.createdAt;
                const updatedAt = h.updatedAt;

                const canFulfill = h.status === "active";

                const badgeClass =
                  h.status === "fulfilled"
                    ? "badge-success"
                    : h.status === "expired"
                    ? "badge-error"
                    : h.status === "cancelled"
                    ? "badge-info"
                    : "badge-warning";

                return (
                  <tr key={h._id}>
                    <td>
                      <div className="font-bold min-w-30">{title}</div>
                      <div className="text-sm opacity-50">
                        {h.typeEdition || h.bookId?.typeEdition || "-"}
                      </div>
                    </td>

                    <td>{author}</td>
                    <td>{isbn}</td>

                    <td>
                      <span className={`badge ${badgeClass}`}>{h.status}</span>
                    </td>

                    <td>{memberEmail}</td>
                    <td>{fmtDate(holdDate)}</td>
                    <td>{fmtDate(h.expiresAt)}</td>
                    <td>{fmtDate(updatedAt)}</td>
                    <td>{fulfilledBy}</td>

                    <td className="text-right">
                      {canFulfill && (
                        <button
                          className="btn bg-green-200 text-green-700 hover:bg-green-300 btn-sm rounded-2xl"
                          disabled={loading}
                          onClick={() => handleFulfill(h._id)}
                        >
                          Fulfill Hold
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="text-center opacity-60">
                  {loading ? "Loading..." : "No holds found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="join flex justify-center mt-8">
          <button
            className="join-item btn"
            onClick={() => dispatch(setAllHoldsPage(Math.max(1, page - 1)))}
            disabled={page <= 1 || loading}
          >
            «
          </button>

          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`join-item btn ${p === page ? "btn-active" : ""}`}
              onClick={() => dispatch(setAllHoldsPage(p))}
              disabled={loading}
            >
              {p}
            </button>
          ))}

          <button
            className="join-item btn"
            onClick={() => dispatch(setAllHoldsPage(Math.min(pages, page + 1)))}
            disabled={page >= pages || loading}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
