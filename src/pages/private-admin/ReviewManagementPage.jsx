import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchAllReviewsAction,
  adminUpdateReviewStatusAction,
} from "../../features/review/reviewAction";

import {
  resetAllReviews,
  setAllReviewsPage,
  setAllReviewsQuery,
} from "../../features/review/reviewSlice";

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("en-AU");
};

export default function ReviewManagementPage() {
  const dispatch = useDispatch();

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.reviewStore.allReviews
  );

  const { page = 1, limit = 10, q = "", status = "" } = lastQuery?.params || {};
  const pages = pagination?.pages || 1;

  const [searchInput, setSearchInput] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);

  useEffect(() => {
    dispatch(resetAllReviews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllReviewsAction({ q, status, page, limit }));
  }, [dispatch, q, status, page, limit]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setAllReviewsQuery({ q: searchInput.trim(), status: statusFilter })
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setAllReviewsQuery({ q: "", status: statusFilter }));
  };

  const handleToggleStatus = async (reviewId, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    const res = await dispatch(
      adminUpdateReviewStatusAction(reviewId, nextStatus)
    );

    if (res?.status !== "success") {
      toast.error(res?.message || "Failed to update review");
      return;
    }

    toast.success(res?.message || "Updated");
    dispatch(fetchAllReviewsAction({ q, status, page, limit }));
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Reviews Management
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
              placeholder="Search: title, comment, ISBN, book, member email, borrowId..."
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
          </select>

          <button
            className="btn btn-primary rounded-full max-h-9"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Reviews"}
          </button>
        </form>
      </div>

      <hr className="my-3" />

      <div className="w-full min-w-0 max-w-full overflow-x-auto mt-4">
        <table className="table w-max min-w-[1200px]">
          <thead>
            <tr>
              <th>Review Title</th>
              <th>Comments</th>
              <th>ISBN</th>
              <th>Book</th>
              <th>Score</th>
              <th>Made By (email Member)</th>
              <th>Status</th>
              <th>Borrow ID</th>
              <th>Date of Review</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.length ? (
              items.map((r) => {
                const isbn = r.bookIsbn || r.bookId?.isbn || "-";
                const bookTitle = r.bookTitle || r.bookId?.title || "N/A";
                const bookAuthor = r.bookAuthor || r.bookId?.author || "N/A";
                const email = r.memberEmail || r.userId?.email || "-";

                return (
                  <tr key={r._id}>
                    <td className="font-bold min-w-48">{r.title || "-"}</td>

                    <td className="max-w-[420px] whitespace-normal">
                      {r.comment || "-"}
                    </td>

                    <td>{isbn}</td>

                    <td>
                      <div className="font-bold min-w-30">{bookTitle}</div>
                      <div className="text-sm opacity-50">{bookAuthor}</div>
                    </td>

                    <td>{r.rating ?? "-"}</td>

                    <td>{email}</td>

                    <td>
                      <span
                        className={`badge ${
                          r.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="font-mono text-xs">
                      {r.borrowId?._id || r.borrowId}
                    </td>

                    <td>{fmtDate(r.createdAt)}</td>

                    <td className="text-right">
                      <button
                        className={`btn btn-sm rounded-2xl ${
                          r.status === "active" ? "btn-error" : "btn-success"
                        }`}
                        disabled={loading}
                        onClick={() => handleToggleStatus(r._id, r.status)}
                      >
                        {r.status === "active"
                          ? "Make Inactive"
                          : "Make Active"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="text-center opacity-60">
                  {loading ? "Loading..." : "No reviews found."}
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
          onClick={() => dispatch(setAllReviewsPage(Math.max(1, page - 1)))}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">Page {page}</span>

        <button
          className="btn"
          onClick={() => dispatch(setAllReviewsPage(page + 1))}
          disabled={loading || page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
