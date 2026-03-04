import React, { useEffect, useState } from "react";
import BookCardAllBooks from "../../components/BookCardAllBooks";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  resetCatalog,
  setCatalogPage,
  setCatalogQuery,
} from "../../features/book/bookSlice";
import { fetchPublicBooksAction } from "../../features/book/bookAction";

export default function AllBooksPage() {
  const dispatch = useDispatch();

  const { items, loading, error, lastQuery, pagination } = useSelector(
    (state) => state.bookStore.catalog
  );

  const { page = 1, limit = 12 } = lastQuery?.params || {};
  const { pages: totalPages = 1 } = pagination || {};

  // local search input
  const [searchInput, setSearchInput] = useState("");

  // reset catalog when entering page
  useEffect(() => {
    dispatch(resetCatalog());
  }, [dispatch]);

  // fetch books when query changes
  useEffect(() => {
    dispatch(fetchPublicBooksAction({ q: searchInput, page, limit }));
  }, [dispatch, searchInput, page, limit]);

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

  // build pagination numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="card flex flex-col items-center justify-center my-10">
      <h2 className="text-primary text-4xl font-bold mb-8">
        Books In Catalogue...
      </h2>

      {/* Search */}
      <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
        <label className="input rounded-full md:w-200 mb-8 flex items-center gap-2">
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
            placeholder="Search books by Title, Author, ISBN..."
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value;
              setSearchInput(value);

              if (value === "") handleClear();
            }}
          />

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

      {/* Loading / Error */}
      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Books grid */}
      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap items-center justify-center">
        {items.map((book) => (
          <BookCardAllBooks key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-3 mt-10">
          {/* Page indicator */}
          {/* <span className="text-sm opacity-70">
          Page {page} of {totalPages}
        </span> */}

          <div className="join">
            <button
              className="join-item btn"
              onClick={() => dispatch(setCatalogPage(page - 1))}
              disabled={page <= 1 || loading}
            >
              « Prev
            </button>

            {pages.map((p) => (
              <button
                key={p}
                className={`join-item btn ${p === page ? "btn-active" : ""}`}
                onClick={() => dispatch(setCatalogPage(p))}
                disabled={loading}
              >
                {p}
              </button>
            ))}

            <button
              className="join-item btn"
              onClick={() => dispatch(setCatalogPage(page + 1))}
              disabled={page >= totalPages || loading}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
