import React, { useEffect, useRef, useState } from "react";
import BookCard2 from "../../components/BookCard2";

//integration - redux
import { useDispatch, useSelector } from "react-redux";
import {
  resetCatalog,
  setCatalogPage,
  setCatalogQuery,
} from "../../features/book/bookSlice";
import { fetchPublicBooksAction } from "../../features/book/bookAction";

export default function AllBooksPage() {
  const dispatch = useDispatch();

  const { items, loading, error, lastQuery } = useSelector(
    (state) => state.bookStore.catalog
  );

  const { q = "", page = 1, limit = 10 } = lastQuery?.params || {};

  // local input (typing) separate from committed query (q)
  const [searchInput, setSearchInput] = useState(q || "");

  // 1) When entering page: reset once (no fetch here)
  useEffect(() => {
    dispatch(resetCatalog()); // should set q="", page=1, etc.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 2) Single source of truth for fetching
  useEffect(() => {
    dispatch(fetchPublicBooksAction({ q, page, limit }));
  }, [dispatch, q, page, limit]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setCatalogPage(1));
    dispatch(setCatalogQuery(searchInput.trim()));
  };

  const handleClear = () => {
    setSearchInput("");
    dispatch(setCatalogPage(1));
    dispatch(setCatalogQuery(""));
  };

  return (
    <div className="card flex flex-col items-center justify-center my-10">
      <h2 className="text-primary text-4xl font-bold mb-8">
        Books In Catalogue...
      </h2>

      {/* Search Input */}
      <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
        <label className="input rounded-full md:w-200 focus-within:border-gray-100 focus-within:ring-0 focus-within:shadow-none mb-8 flex items-center gap-2">
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
            placeholder="Search books by Title, Author, etc...)"
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value;
              setSearchInput(value);

              // if user clears input, immediately reset search
              if (value === "") handleClear();
            }}
          />

          {/* optional clear button (better UX than relying on browser X) */}
          {searchInput && (
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
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
          disabled={page <= 1 || loading}
        >
          Prev
        </button>

        <span className="pt-2">Page {page}</span>

        <button
          className="btn"
          onClick={() => dispatch(setCatalogPage(page + 1))}
          disabled={loading /* optionally disable if last page known */}
        >
          Next
        </button>
      </div>
    </div>
  );
}
