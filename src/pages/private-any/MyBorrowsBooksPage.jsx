import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchMyBorrowsAction } from "../../features/borrow/borrowAction";
import { createReviewAction } from "../../features/review/reviewAction";

export default function MyBorrowsBooksPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);
  const {
    myBorrows = [],
    loading: borrowsLoading,
    error: borrowsError,
  } = useSelector((state) => state.borrowStore);

  const { loading: reviewLoading, error: reviewError } = useSelector(
    (state) => state.reviewStore
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyBorrowsAction());
    }
  }, [user?._id, dispatch]);

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString("en-AU");
  };

  const rows = useMemo(() => {
    return myBorrows.map((b) => {
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
  }, [myBorrows]);

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

      {borrowsLoading && (
        <div className="flex justify-center mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {!borrowsLoading && borrowsError && (
        <div className="alert alert-error mt-4">
          <span>{borrowsError}</span>
        </div>
      )}

      {!borrowsLoading && !borrowsError && rows.length === 0 && (
        <div className="alert alert-info mt-4">
          <span>No borrows yet.</span>
        </div>
      )}

      {!borrowsLoading && !borrowsError && rows.length > 0 && (
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

          {/* click outside closes */}
          <div className="modal-backdrop" onClick={closeModal} />
        </div>
      )}
    </div>
  );
}
