import React, { useEffect, useState } from "react";
import BookCard2 from "../../components/BookCard2";

//integration - redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalogBooks,
  setCatalogPage,
  setCatalogQuery,
} from "../../features/book/bookSlice";

export default function AllBooksPage() {
  const dispatch = useDispatch();
  const { items, loading, error, q, page, limit } = useSelector(
    (state) => state.bookStore.catalog
  );

  const [searchInput, setSearchInput] = useState(q || "");

  // Load initial or when page/q changes
  useEffect(() => {
    dispatch(fetchCatalogBooks({ q, page, limit }));
  }, [dispatch, q, page, limit]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setCatalogPage(1));
    dispatch(setCatalogQuery(searchInput));
    // useEffect runs cause q/page changed
  };

  return (
    <div className="card flex flex-col items-center justify-center my-10">
      <h2 className="text-primary text-4xl font-bold mb-8">
        Books In Catalogue...
      </h2>
      {/* Search Input */}
      <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
        <label
          className="input rounded-full md:w-200 focus-within:border-gray-100
    focus-within:ring-0
    focus-within:shadow-none mb-8"
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
            placeholder="Search for your favorites books (e.g. Quijote, Sherlock Holmes...)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
      </form>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap items-center justify-center">
        {items.map((book) => (
          <BookCard2 key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-3 mt-8">
        <button
          className="btn"
          onClick={() => dispatch(setCatalogPage(Math.max(1, page - 1)))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="pt-2">Page {page}</span>
        <button
          className="btn"
          onClick={() => dispatch(setCatalogPage(page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
