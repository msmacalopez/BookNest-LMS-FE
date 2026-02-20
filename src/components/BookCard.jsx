import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book, badge }) {
  if (!book) return null;

  const { _id, title, description, genre, author } = book;

  const coverImageUrl =
    book?.coverImageUrl ||
    "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg";

  const shortDesc =
    description?.length > 80 ? `${description.slice(0, 80)}...` : description;

  return (
    <div>
      <div className="bg-base-100 h-95 md:w-96 shadow-sm">
        <figure>
          <img
            src={coverImageUrl}
            alt={title}
            className="max-w-100 max-h-50 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{badge}</div>
          </h2>
          <small className="opacity-70">
            {genre} {author ? `• ${author}` : ""}
          </small>
          <p>{shortDesc}</p>
          <div className="card-actions justify-end">
            <Link to={`/books/${_id}`} className="badge badge-outline">
              More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
