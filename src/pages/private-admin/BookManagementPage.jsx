// BookManagementPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchAllBooksAction,
  updateBookStatusAdminAction,
  deleteBookAdminAction,
} from "../../features/book/bookAction";

const selectCatalog = (s) => s.bookStore?.catalog || s.books?.catalog;

export default function BookManagementPage() {
  const dispatch = useDispatch();

  const catalog = useSelector(selectCatalog);
  const items = catalog?.items || [];
  const loading = catalog?.loading || false;
  const error = catalog?.error || null;
  const pagination = catalog?.pagination || { page: 1, pages: 1, limit: 10 };
  const lastQuery = catalog?.lastQuery || {
    params: { q: "", page: 1, limit: 10 },
  };

  const page = lastQuery?.params?.page ?? 1;
  const limit = lastQuery?.params?.limit ?? 10;
  const pages = pagination?.pages ?? 1;

  const [qInput, setQInput] = useState(lastQuery?.params?.q ?? "");
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  // Initial load (admin list)
  useEffect(() => {
    dispatch(fetchAllBooksAction({ q: "", page: 1, limit: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Clear selection whenever list changes
  useEffect(() => {
    setSelectedIds(new Set());
  }, [items]);

  const allChecked = useMemo(() => {
    if (!items.length) return false;
    return items.every((b) => selectedIds.has(b._id));
  }, [items, selectedIds]);

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
      items.forEach((b) => next.add(b._id));
      return next;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAllBooksAction({ q: qInput.trim(), page: 1, limit }));
  };

  const handleClear = () => {
    setQInput("");
    dispatch(fetchAllBooksAction({ q: "", page: 1, limit }));
  };

  const refresh = (goToPage = page) => {
    dispatch(fetchAllBooksAction({ q: qInput.trim(), page: goToPage, limit }));
  };

  const handleDeleteOne = async (id) => {
    const ok = window.confirm("Delete this book? This cannot be undone.");
    if (!ok) return;

    const res = await dispatch(deleteBookAdminAction(id));
    const status = res?.payload?.status || res?.status;

    if (status === "success") {
      toast.success("Book deleted");
      refresh();
    } else {
      toast.error(res?.payload?.message || res?.message || "Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) {
      toast.info("No books selected");
      return;
    }

    const ok = window.confirm(
      `Delete ${selectedIds.size} selected book(s)? This cannot be undone.`
    );
    if (!ok) return;

    // Sequential deletes (simple + reliable)
    for (const id of selectedIds) {
      await dispatch(deleteBookAdminAction(id));
    }

    toast.success("Selected books deleted");
    refresh(1);
  };

  const goPrev = () => {
    if (page <= 1) return;
    dispatch(fetchAllBooksAction({ q: qInput.trim(), page: page - 1, limit }));
  };

  const goNext = () => {
    if (page >= pages) return;
    dispatch(fetchAllBooksAction({ q: qInput.trim(), page: page + 1, limit }));
  };

  const handleToggleStatus = async (book) => {
    const nextStatus = book.status === "active" ? "inactive" : "active";

    const ok = window.confirm(
      `Change status for "${book.title}" to "${nextStatus}"?`
    );
    if (!ok) return;

    const res = await dispatch(
      updateBookStatusAdminAction(book._id, nextStatus)
    );
    const status = res?.payload?.status || res?.status;

    if (status === "success") {
      toast.success(`Status updated to ${nextStatus}`);
      refresh(); // re-fetch the list (you already have refresh())
    } else {
      toast.error(res?.payload?.message || res?.message || "Update failed");
    }
  };

  return (
    <div>
      {/* Header controls */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Books Management
        </h1>

        {/*NEW route */}
        <Link to="/dashboard/books/new" className="btn btn-success max-h-8">
          Add New Book
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="w-full md:w-auto">
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
              placeholder="Search (title/author/isbn)"
              value={qInput}
              onChange={(e) => {
                const value = e.target.value;
                setQInput(value);
                if (value === "") handleClear();
              }}
            />
            {qInput && (
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </label>
        </form>

        {/* Bulk delete */}
        <button
          className="btn btn-error max-h-8 mb-2 md:mb-0"
          onClick={handleBulkDelete}
          disabled={selectedIds.size === 0 || loading}
        >
          Delete All Selections
        </button>
      </div>

      <hr />

      {/* Loading/Error */}
      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="mt-3 text-error">{error}</p>}

      {/* Table */}
      <div className="w-full max-w-[calc(1280px-4rem)] mx-auto overflow-x-auto">
        <table className="table w-full table-auto">
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
                    disabled={!items.length}
                  />
                </label>
              </th>
              <th>Actions</th>
              <th>Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Total</th>
              <th>On Loan</th>
              <th>Available</th>
              <th>Description</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Edition/Type</th>
              <th>Language</th>
              <th>Country</th>
              <th>Publisher</th>
              <th>Pages</th>
            </tr>
          </thead>

          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={16} className="text-center py-8 opacity-70">
                  No books found.
                </td>
              </tr>
            )}

            {items.map((b) => {
              const onLoan =
                (Number(b.quantityTotal) || 0) -
                (Number(b.quantityAvailable) || 0);

              return (
                <tr key={b._id}>
                  {/* Select */}
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4"
                      checked={selectedIds.has(b._id)}
                      onChange={() => toggleOne(b._id)}
                    />
                  </th>

                  {/* Actions */}
                  <td>
                    <Link
                      to={`/dashboard/books/${b._id}/edit`}
                      className="btn btn-warning max-h-6 w-14 mb-2"
                    >
                      Edit
                    </Link>

                    {/* <button
                      className="btn btn-error max-h-6 w-20 mt-2"
                      onClick={() => handleDeleteOne(b._id)}
                      disabled={loading}
                    >
                      Delete
                    </button> */}
                  </td>
                  {/* Title + cover */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              b.coverImageUrl ||
                              "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                            }
                            alt={b.title || "Book Cover"}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{b.title || "N/A"}</div>
                        <div className="text-sm opacity-50">
                          {b.language || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Status */}
                  <td>
                    <div
                      className={`font-bold ${
                        b.status === "active" ? "text-success" : "text-error"
                      }`}
                    >
                      {b.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </div>
                    <button
                      className={`btn max-h-6 w-30 mt-2 text-xs ${
                        b.status === "active"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                      onClick={() => handleToggleStatus(b)}
                      disabled={loading}
                    >
                      {b.status === "active" ? "Make Inactive" : "Make Active"}
                    </button>
                  </td>

                  <td>{b.author || "N/A"}</td>
                  <td>{b.isbn || "N/A"}</td>
                  <td>{b.quantityTotal ?? 0}</td>
                  <td>{onLoan}</td>
                  <td>{b.quantityAvailable ?? 0}</td>
                  <td>{(b.description || "").slice(0, 30)}</td>
                  <td>{b.publicationYear ?? "N/A"}</td>
                  <td>{b.genre || "N/A"}</td>
                  <td>{b.typeEdition || "N/A"}</td>
                  <td>{b.language || "N/A"}</td>
                  <td>{b.country || "N/A"}</td>
                  <td>{b.publisher || "N/A"}</td>
                  <td>{b.pages ?? "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
          {/* Page {page} of {pages} */}
        </span>

        <button
          className="btn"
          onClick={goNext}
          disabled={page >= pages || loading}
        >
          Next
        </button>
      </div>

      {/* Small page indicator */}
      {/* <p className="text-center mt-2 opacity-70 text-sm">
        Page {page} of {pages}
      </p> */}
    </div>
  );
}
