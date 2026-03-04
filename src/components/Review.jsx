import React from "react";
import StarRating from "./StarRating";

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("en-AU");
};

export default function Review({ review }) {
  const name =
    review?.userId?.fName || review?.userId?.lName
      ? `${review?.userId?.fName || ""} ${review?.userId?.lName || ""}`.trim()
      : "Anonymous";

  return (
    <div className="card bg-base-100 shadow-sm w-full md:w-[360px]">
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-bold text-lg">{review?.title || "Review"}</h4>
          <div className="text-sm opacity-70">{fmtDate(review?.createdAt)}</div>
        </div>

        <div className="flex items-center gap-3">
          <StarRating value={review?.rating || 0} />
          <span className="text-sm opacity-70">by {name}</span>
        </div>

        {review?.comment ? (
          <p className="mt-2">{review.comment}</p>
        ) : (
          <p className="mt-2 opacity-60 italic">No comment.</p>
        )}
      </div>
    </div>
  );
}
