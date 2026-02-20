import React from "react";
import { Link } from "react-router-dom";

export default function BookCard2({ book }) {
  if (!book) return null;

  const { _id, title, genre, author, description } = book;

  const coverImageUrl =
    book?.coverImageUrl ||
    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";

  const shortDesc =
    description?.length > 70 ? `${description.slice(0, 70)}...` : description;

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm md:h-50 w-80 md:w-100">
        <figure className="min-w-40">
          <img src={coverImageUrl} alt={`${title || "Book"} Cover`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title || "N/A"}</h2>
          <small>
            {genre || "Unknown Genre"} {author || "N/A"}
          </small>
          <p>{shortDesc || "N/A"}</p>
          <div className="card-actions justify-end">
            <Link to={`/books/${_id}`} className="btn btn-primary max-h-8">
              More / Rent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
