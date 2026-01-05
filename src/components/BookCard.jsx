import React from "react";
import { Link } from "react-router-dom";

export default function BookCard() {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg"
            alt="Shoes"
            className="max-w-100 max-h-50 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Card Title
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <Link to="/booksdetails" className="badge badge-outline">
              More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
