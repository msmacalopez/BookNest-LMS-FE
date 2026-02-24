import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import BookReviews from "../../components/BookReviews";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchActiveBookById } from "../../features/book/bookAPI.js";
import StarRating from "../../components/StarRating.jsx";

import {
  createMyBorrowAction,
  fetchMyBorrowsAction,
} from "../../features/borrow/borrowAction";

export default function BookDetailPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [book, setBook] = useState(null);

  const { user } = useSelector((state) => state.authStore);
  const { myBorrows } = useSelector((state) => state?.borrowStore || []);
  const borrowLoading = useSelector((state) => state?.borrow?.loading);

  useEffect(() => {
    let cancelled = false;

    const loadBook = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetchActiveBookById(bookId);

        if (res?.status !== "success") {
          throw new Error(res?.message || "Failed to fetch book");
        }

        if (!cancelled) setBook(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (bookId) loadBook();

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  //Load my borrows ONLY when user is logged in
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyBorrowsAction());
    }
  }, [user?._id, dispatch]);

  const derived = useMemo(() => {
    const qtyAvailable = Number(book?.quantityAvailable ?? 0);
    const isAvailable = qtyAvailable > 0;
    const isEbook = book?.typeEdition === "Ebook";
    return { qtyAvailable, isAvailable, isEbook };
  }, [book]);

  //detect if this book is already borrowed by me
  const alreadyBorrowed = useMemo(() => {
    return myBorrows.some((b) => {
      const borrowedBookId = b?.bookId?._id || b?.bookId;
      return (
        String(borrowedBookId) === String(bookId) && b?.status === "borrowed"
      );
    });
  }, [myBorrows, bookId]);

  const handleBorrow = async () => {
    if (!bookId || !book) return;

    if (!user?._id) {
      navigate("/login");
      return;
    }

    if (!derived.isEbook) {
      alert("Members can only borrow Ebook editions.");
      return;
    }

    if (!derived.isAvailable) {
      alert("No available copies right now.");
      return;
    }

    const ok = window.confirm("Confirm borrow this Ebook?");
    if (!ok) return;

    const res = await dispatch(createMyBorrowAction(bookId));

    // update UI locally (decrement available qty)
    if (res?.status === "success") {
      setBook((prev) => {
        if (!prev) return prev;
        const nextQty = Math.max(0, Number(prev.quantityAvailable ?? 0) - 1);
        return { ...prev, quantityAvailable: nextQty };
      });
      //refresh my borrows so badge shows immediately
      dispatch(fetchMyBorrowsAction());
      toast.success("Book borrowed successfully!");
    } else if (res?.message) {
      alert(res.message);
    }
  };

  if (loading) {
    return (
      <div className="p-10 pt-2">
        <h2 className="text-primary text-4xl text-center font-bold my-5">
          Book Details
        </h2>
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 pt-2">
        <h2 className="text-primary text-4xl text-center font-bold my-5">
          Book Details
        </h2>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!book) return null;

  const imageSrc =
    book.coverImageUrl?.trim() ||
    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";

  return (
    <div className="p-10 pt-2">
      <h2 className="text-primary text-4xl text-center font-bold my-5 ">
        Book Details
      </h2>

      <div className="card card-side bg-base-100 shadow-sm lg:gap-20 flex flex-col md:flex-row">
        <figure>
          <img
            src={imageSrc}
            alt={book.title}
            className="max-h-150 md:max-h-none min-w-100 rounded-2xl"
          />
        </figure>

        <div className="card-body flex flex-col gap-5 max-w-200">
          <h2 className="card-title text-accent text-3xl font-bold">
            {book.title}
          </h2>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Rating:</p>
            <StarRating value={book.averageRating ?? 0} />
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Genre:</p>
            <p>{book.genre}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Description:</p>
            <p>{book.description}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Publisher:</p>
            <p>{book.publisher}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Year:</p>
            <p>{book.publicationYear}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">ISBN:</p>
            <p>{book.isbn}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Language:</p>
            <p>{book.language}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Country:</p>
            <p>{book.country}</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Pages:</p>
            <p>{book.pages}p</p>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Edition:</p>
            <div className="badge badge-accent text-white">
              {book.typeEdition}
            </div>
          </div>

          <div className="flex gap-5">
            <p className="font-bold uppercase">Available:</p>
            <p>{derived.qtyAvailable}</p>
          </div>

          <div className="card-actions justify-end mt-5">
            {/* Availability badge */}
            {!derived.isAvailable ? (
              <div className="badge badge-error badge-lg min-h-10">
                Available Soon
              </div>
            ) : (
              <div className="badge badge-success badge-lg min-h-10 text-white">
                Available
              </div>
            )}

            {/* Borrowed badge (if already borrowed) */}
            {derived.isEbook && alreadyBorrowed && (
              <div className="badge badge-primary badge-lg min-h-10">
                Borrowed
              </div>
            )}

            {/* Borrow button (only if Ebook AND logged in AND not already borrowed) */}
            {derived.isEbook && user?._id && !alreadyBorrowed && (
              <button
                className="btn btn-primary"
                onClick={handleBorrow}
                disabled={borrowLoading || !derived.isAvailable}
              >
                {borrowLoading ? "Borrowing..." : "Borrow"}
              </button>
            )}

            {/* Log in button (only if Ebook AND logged out) */}
            {derived.isEbook && !user?._id && (
              <Link to="/login" className="btn btn-primary">
                Log In to Borrow
              </Link>
            )}
          </div>
        </div>
      </div>

      <BookReviews />
    </div>
  );
}
