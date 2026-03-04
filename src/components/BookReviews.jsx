import React, { useEffect, useState } from "react";
import Review from "./Review";
import { fetchReviewsByBook } from "../features/review/reviewAPI";

export default function BookReviews({ bookId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!bookId) return;
      try {
        setLoading(true);
        setError("");

        const res = await fetchReviewsByBook(bookId);

        if (res?.status !== "success") {
          throw new Error(res?.message || "Failed to load reviews");
        }

        if (!cancelled) setReviews(res?.data || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [bookId]);

  return (
    <div className="mt-10">
      <h3 className="text-secondary text-3xl text-left font-bold my-5">
        Reviews
      </h3>

      {loading && (
        <div className="flex justify-center py-6">
          <span className="loading loading-spinner loading-md" />
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="alert">
          <span>No reviews yet.</span>
        </div>
      )}

      <div className="flex gap-5 flex-wrap">
        {reviews.map((r) => (
          <Review key={r._id} review={r} />
        ))}
      </div>
    </div>
  );
}
