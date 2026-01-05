import React from "react";
import BookCard from "./BookCard";

export default function FavoriteBooks() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      {/* Search Input */}
      <label
        className="input rounded-full md:w-200 focus-within:border-gray-100
    focus-within:ring-0
    focus-within:shadow-none"
      >
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
          required
          placeholder="Search for your favorites books (e.g. Quijote, Sherlock Holmes...)"
        />
      </label>
      {/* List of Top */}
      <h2 className="text-primary text-4xl font-bold my-10">Top Books</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
      {/* List of New Books */}
      <h2 className="text-primary text-4xl font-bold my-10">
        New in Catalogue
      </h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
}
