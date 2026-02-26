import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  resetMyBorrows,
  setMyBorrowsPage,
} from "../../features/borrow/borrowSlice";
import { fetchMyBorrowsAction } from "../../features/borrow/borrowAction";
import { createReviewAction } from "../../features/review/reviewAction";

export default function MyBorrowsBooksPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);

  //catalog style
  const { items, loading, error, lastQuery, pagination } = useSelector(
    (state) => state.borrowStore.myBorrows
  );

  const { pages = 1 } = pagination || {};

  const { page = 1, limit = 10 } = lastQuery?.params || {};

  const { loading: reviewLoading, error: reviewError } = useSelector(
    (state) => state.reviewStore
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  // 1) When entering page: reset once (no fetch here) — same as AllBooks
  useEffect(() => {
    dispatch(resetMyBorrows());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 2) Single source of truth for fetching — same as AllBooks
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyBorrowsAction({ page, limit }));
    }
  }, [dispatch, user?._id, page, limit]);

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString("en-AU");
  };

  const rows = useMemo(() => {
    return (items || []).map((b) => {
      const book = b.bookId && typeof b.bookId === "object" ? b.bookId : {};

      const cover =
        b.coverImageUrl ||
        book.coverImageUrl ||
        "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";

      return {
        _id: b._id,
        bookId: book?._id || b.bookId,
        bookTitle: b.bookTitle || book.title || "Untitled",
        typeEdition: b.typeEdition || book.typeEdition || "-",
        coverImageUrl: cover,
        borrowDate: b.borrowDate,
        dueDate: b.dueDate,
        returnDate: b.returnDate,
        status: b.status,
      };
    });
  }, [items]);

  const openReviewModal = (borrowRow) => {
    setSelectedBorrow(borrowRow);
    setRating(5);
    setTitle("");
    setComment("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBorrow(null);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedBorrow?._id) return;

    const payload = {
      rating: Number(rating),
      title: title.trim(),
      comment: comment.trim(),
    };

    const res = await dispatch(createReviewAction(selectedBorrow._id, payload));

    if (res?.status === "success") {
      toast.success("Review submitted and pending approval");
      closeModal();
      // after review created, borrows will refresh via your createReviewAction -> fetchMyBorrowsAction
      // BUT: now fetchMyBorrowsAction expects {page,limit}, so make sure your action passes it (see note below)
    } else {
      toast.error(res?.message || "Failed to submit review");
    }
  };

  const StatusBadge = ({ status, dueDate }) => {
    const today = new Date();
    const isOverdue =
      status === "borrowed" && dueDate && new Date(dueDate) < today;

    if (status === "reviewed")
      return <div className="badge badge-primary">Reviewed</div>;
    if (status === "returned")
      return <div className="badge badge-success">Returned</div>;
    if (isOverdue) return <div className="badge badge-error">Overdue</div>;
    if (status === "borrowed")
      return <div className="badge badge-warning">Borrowed</div>;

    return <div className="badge badge-ghost">{status || "Unknown"}</div>;
  };

  if (!user?._id) {
    return (
      <div className="p-6">
        <h1 className="text-primary text-2xl font-bold mb-3">My Borrows</h1>
        <hr />
        <div className="alert alert-info mt-4 flex justify-between items-center">
          <span>Please log in to see your borrowed books.</span>
          <Link to="/login" className="btn btn-primary btn-sm">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-primary text-2xl font-bold mb-3">My Borrows</h1>
      <hr />

      {loading && (
        <div className="flex justify-center mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-error mt-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="alert alert-soft mt-4">
          <span>No borrows yet.</span>
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Borrowed Date</th>
                <th>Expected Return</th>
                <th>Effective Return</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={r.coverImageUrl} alt={r.bookTitle} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{r.bookTitle}</div>
                        <div className="badge badge-ghost badge-sm">
                          {r.typeEdition}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{formatDate(r.borrowDate)}</td>
                  <td>{formatDate(r.dueDate)}</td>
                  <td>{formatDate(r.returnDate)}</td>

                  <td>
                    <StatusBadge status={r.status} dueDate={r.dueDate} />
                  </td>

                  <td className="text-right">
                    {/* Review button only if returned */}
                    {r.status === "returned" && (
                      <button
                        className="btn btn-info btn-sm rounded-2xl"
                        onClick={() => openReviewModal(r)}
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination*/}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="btn"
          onClick={() => dispatch(setMyBorrowsPage(Math.max(1, page - 1)))}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">Page {page}</span>

        <button
          className="btn"
          onClick={() => dispatch(setMyBorrowsPage(page + 1))}
          disabled={loading || page >= pages}
        >
          Next
        </button>
      </div>

      {/* ---------- MODAL ---------- */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Write a review</h3>
            <p className="opacity-70 mt-1">
              {selectedBorrow?.bookTitle} ({selectedBorrow?.typeEdition})
            </p>

            {reviewError && (
              <div className="alert alert-error mt-4">
                <span>{reviewError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Rating (1–5)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="input input-bordered w-full"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Review title"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Comment</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your impressions about the book..."
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                  disabled={reviewLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>

          <div className="modal-backdrop" onClick={closeModal} />
        </div>
      )}
    </div>
  );
}
