//BorrowManagementPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchAllBorrowsAction,
  adminReturnBookAction,
} from "../../features/borrow/borrowAction";

import {
  resetAllBorrows,
  setAllBorrowsPage,
  setAllBorrowsQuery,
} from "../../features/borrow/borrowSlice";

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("en-AU");
};

export default function BorrowManagementPage() {
  const dispatch = useDispatch();

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.borrowStore.allBorrows
  );

  const { page = 1, limit = 10, q = "", status = "" } = lastQuery?.params || {};
  const pages = pagination?.pages || 1;

  const [searchInput, setSearchInput] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);

  useEffect(() => {
    dispatch(resetAllBorrows());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllBorrowsAction({ q, status, page, limit }));
  }, [dispatch, q, status, page, limit]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setAllBorrowsQuery({ q: searchInput.trim(), status: statusFilter })
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setAllBorrowsQuery({ q: "", status: statusFilter }));
  };

  const handleReturn = async (borrowId) => {
    const res = await dispatch(adminReturnBookAction(borrowId));
    if (res?.status !== "success") {
      toast.error(res?.message || "Failed to return book");
      return;
    }
    toast.success(res?.message || "Returned");
    dispatch(fetchAllBorrowsAction({ q, status, page, limit }));
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Borrows Management
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
              placeholder="Search by title, ISBN, emails, status..."
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
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
            <option value="reviewed">Reviewed</option>
          </select>

          <button
            className="btn btn-primary rounded-full max-h-9"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Borrows"}
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
              <th>Date Borrowed</th>
              <th>Expected Return</th>
              <th>Effective Returned</th>
              <th>Returned By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.length ? (
              items.map((b) => {
                const title = b.bookTitle || b.bookId?.title || "N/A";
                const author = b.bookAuthor || b.bookId?.author || "N/A";
                const isbn = b.bookIsbn || b.bookId?.isbn || "-";
                const memberEmail = b.memberEmail || b.userId?.email || "-";
                const returnedBy =
                  b.returnedByEmail || b.returnedById?.email || "-";
                const isReturnable =
                  b.status === "borrowed" || b.status === "overdue";

                return (
                  <tr key={b._id}>
                    <td>
                      <div className="font-bold min-w-30">{title}</div>
                      <div className="text-sm opacity-50">
                        {b.typeEdition || b.bookId?.typeEdition || "-"}
                      </div>
                    </td>

                    <td>{author}</td>
                    <td>{isbn}</td>

                    <td>
                      <span
                        className={`badge ${
                          b.status === "returned"
                            ? "badge-success"
                            : b.status === "overdue"
                            ? "badge-error"
                            : b.status === "reviewed"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>{memberEmail}</td>
                    <td>{fmtDate(b.borrowDate)}</td>
                    <td>{fmtDate(b.dueDate)}</td>
                    <td>{fmtDate(b.returnDate)}</td>
                    <td>{returnedBy}</td>

                    <td className="text-right">
                      {isReturnable && (
                        <button
                          className="btn bg-green-200 text-green-700 hover:bg-green-300 btn-sm rounded-2xl"
                          disabled={loading}
                          onClick={() => handleReturn(b._id)}
                        >
                          Mark Return
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="text-center opacity-60">
                  {loading ? "Loading..." : "No borrows found."}
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
          onClick={() => dispatch(setAllBorrowsPage(Math.max(1, page - 1)))}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">
          Page {page}
          {/* Page {page} of {pages} • Total {pagination?.total || 0} */}
        </span>

        <button
          className="btn"
          onClick={() => dispatch(setAllBorrowsPage(page + 1))}
          disabled={loading || page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
