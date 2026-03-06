import React from "react";

const RecommendedBooks = ({ books = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-[#1e293b] mb-4 md:mb-6">
          Recommended for You
        </h2>
        <div className="text-sm text-gray-500">Loading recommendations...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-[#1e293b] mb-4 md:mb-6">
        Recommended for You
      </h2>

      {books.length === 0 ? (
        <div className="text-sm text-gray-500">
          No recommendations available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-100 rounded-2xl p-3 hover:shadow-sm transition-shadow"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold text-[#1e293b] line-clamp-2">
                  {book.title}
                </h3>
                <p className="mt-1 text-xs text-gray-600">{book.author}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {book.genre ? (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      {book.genre}
                    </span>
                  ) : null}

                  {book.quantityAvailable > 0 ? (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700">
                      Available
                    </span>
                  ) : (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      Unavailable
                    </span>
                  )}
                </div>

                <p className="mt-2 text-[11px] text-gray-500">
                  Borrowed {book.timesBorrowed || 0} times
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedBooks;
