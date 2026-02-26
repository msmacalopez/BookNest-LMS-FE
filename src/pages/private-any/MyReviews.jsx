import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMyReviewsAction } from "../../features/review/reviewAction";
import {
  resetMyReviews,
  setMyReviewsPage,
} from "../../features/review/reviewSlice";

export default function MyReviews() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);

  const { items, loading, error, lastQuery, pagination } = useSelector(
    (state) => state.reviewStore.myReviews
  );

  const { page = 1, limit = 10 } = lastQuery?.params || {};
  const { pages = 1 } = pagination || {};

  // 1) reset once on enter (same as AllBooks/MyBorrows)
  useEffect(() => {
    dispatch(resetMyReviews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 2) fetch based on query params
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyReviewsAction({ page, limit }));
    }
  }, [user?._id, dispatch, page, limit]);

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString("en-AU");
  };

  if (!user?._id) {
    return (
      <div className="p-6">
        <h1 className="text-primary text-2xl font-bold mb-3">My Reviews</h1>
        <hr />
        <div className="alert alert-info mt-4 flex justify-between items-center">
          <span>Please log in to see your reviews.</span>
          <Link to="/login" className="btn btn-primary btn-sm">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-primary text-2xl font-bold mb-3">My Reviews</h1>
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

      {!loading && !error && (items || []).length === 0 && (
        <div className="alert alert-soft mt-4">
          <span>No approved reviews yet.</span>
        </div>
      )}

      {!loading && !error && (items || []).length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Review Title</th>
                <th>Comments</th>
                <th>Borrowed On</th>
                <th>Returned On</th>
                <th>Reviewed On</th>
              </tr>
            </thead>

            <tbody>
              {(items || []).map((r) => {
                const book =
                  r.bookId && typeof r.bookId === "object" ? r.bookId : {};

                const cover =
                  book.coverImageUrl ||
                  "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";

                const bookTitle = book.title || "Untitled";
                const typeEdition = book.typeEdition || "-";
                const author = book.author || "-";
                const borrow =
                  r.borrowId && typeof r.borrowId === "object"
                    ? r.borrowId
                    : {};

                return (
                  <tr key={r._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={cover} alt={bookTitle} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bookTitle}</div>
                          <div className="badge badge-ghost badge-sm">
                            {typeEdition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{author}</td>
                    <td>{r.rating}/5</td>
                    <td>{r.title}</td>
                    <td className="max-w-xl whitespace-normal">
                      {r.comment || "-"}
                    </td>

                    <td>{formatDate(borrow.borrowDate)}</td>
                    <td>{formatDate(borrow.returnDate)}</td>
                    <td>{formatDate(r.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination (same format as MyBorrows / AllBooks) */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="btn"
          onClick={() => dispatch(setMyReviewsPage(Math.max(1, page - 1)))}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">Page {page}</span>

        <button
          className="btn"
          onClick={() => dispatch(setMyReviewsPage(page + 1))}
          disabled={loading || page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
