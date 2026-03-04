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

import {
  createMyHoldAction,
  fetchMyHoldsAction,
} from "../../features/hold/holdAction";

const fmtDateTime = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleString("en-AU");
};

export default function BookDetailPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [book, setBook] = useState(null);

  // for showing expiry after creating hold
  const [lastHoldExpiry, setLastHoldExpiry] = useState("");

  const { user } = useSelector((state) => state.authStore);

  // store key is borrowStore, not borrow
  const borrowLoading = useSelector((state) => state.borrowStore.loading);

  const myBorrows =
    useSelector((state) => state.borrowStore.myBorrows?.items) || [];

  // my holds from redux (add holdStore in store.js)
  const myHolds = useSelector((state) => state.holdStore?.myHolds?.items) || [];
  const holdLoading = useSelector((state) => state.holdStore?.myHolds?.loading);

  // ----------------------------
  // Load book
  // ----------------------------
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

  // ----------------------------
  // Load my borrows + my holds when logged in
  // ----------------------------
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyBorrowsAction());
      dispatch(fetchMyHoldsAction()); // ✅ new
    }
  }, [user?._id, dispatch]);

  const derived = useMemo(() => {
    const qtyAvailable = Number(book?.quantityAvailable ?? 0);
    const isAvailable = qtyAvailable > 0;
    const isEbook = book?.typeEdition === "Ebook";
    const isHoldablePhysical = !!book && !isEbook; // Hardcover/Paperback/Audiobook
    return { qtyAvailable, isAvailable, isEbook, isHoldablePhysical };
  }, [book]);

  // already borrowed (only ebook logic you had)
  const alreadyBorrowed = useMemo(() => {
    return myBorrows.some((b) => {
      const borrowedBookId = b?.bookId?._id || b?.bookId || b?._id;
      return (
        String(borrowedBookId) === String(bookId) && b?.status === "borrowed"
      );
    });
  }, [myBorrows, bookId]);

  // counts for disabling hold button (client-side UX; backend still enforces)
  const activeBorrowsCount = useMemo(() => {
    return myBorrows.filter((b) => ["borrowed", "overdue"].includes(b?.status))
      .length;
  }, [myBorrows]);

  const activeHoldsCount = useMemo(() => {
    // adjust "active" if your backend uses a different status name
    return myHolds.filter((h) => h?.status === "active").length;
  }, [myHolds]);

  const alreadyHeld = useMemo(() => {
    return myHolds.some((h) => {
      const holdBookId = h?.bookId?._id || h?.bookId;
      return String(holdBookId) === String(bookId) && h?.status === "active";
    });
  }, [myHolds, bookId]);

  // ----------------------------
  // Borrow ebook
  // ----------------------------
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

    if (res?.status === "success") {
      setBook((prev) => {
        if (!prev) return prev;
        const nextQty = Math.max(0, Number(prev.quantityAvailable ?? 0) - 1);
        return { ...prev, quantityAvailable: nextQty };
      });

      dispatch(fetchMyBorrowsAction());
      toast.success("Book borrowed successfully!");
    } else {
      toast.error(res?.message || "Borrow failed");
    }
  };

  // ----------------------------
  //Place hold (physical only)
  // ----------------------------
  const handlePlaceHold = async () => {
    if (!bookId || !book) return;

    if (!user?._id) {
      navigate("/login");
      return;
    }

    if (!derived.isHoldablePhysical) {
      toast.info("Holds are only for physical books.");
      return;
    }

    if (!derived.isAvailable) {
      toast.error("No available copies right now.");
      return;
    }

    const ok = window.confirm("Place a hold for 2 days?");
    if (!ok) return;

    const res = await dispatch(createMyHoldAction(bookId));

    if (res?.status === "success") {
      // backend should reserve a copy immediately for holds
      setBook((prev) => {
        if (!prev) return prev;
        const nextQty = Math.max(0, Number(prev.quantityAvailable ?? 0) - 1);
        return { ...prev, quantityAvailable: nextQty };
      });

      // show expiry if backend returned it
      const expiresAt =
        res?.data?.expiresAt || res?.payload?.data?.expiresAt || "";
      setLastHoldExpiry(expiresAt ? fmtDateTime(expiresAt) : "");

      dispatch(fetchMyHoldsAction());
      toast.success(res?.message || "Hold placed!");
    } else {
      // show backend message (limits, overdue restrictions, etc.)
      toast.error(res?.message || "Failed to place hold");
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

  //disable hold button (UX only; backend enforces too)
  const holdDisabled =
    holdLoading ||
    !derived.isAvailable ||
    activeHoldsCount >= 3 ||
    activeBorrowsCount >= 5 ||
    alreadyHeld;

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

          {lastHoldExpiry && (
            <div className="alert alert-info py-2">
              <span>Hold placed. Expires: {lastHoldExpiry}</span>
            </div>
          )}

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

            {/* Borrowed badge (Ebook only) */}
            {derived.isEbook && alreadyBorrowed && (
              <div className="badge badge-error badge-lg min-h-10">
                Already Borrowed
              </div>
            )}

            {/* Borrow button (Ebook only) */}
            {derived.isEbook && user?._id && !alreadyBorrowed && (
              <button
                className="btn btn-primary"
                onClick={handleBorrow}
                disabled={borrowLoading || !derived.isAvailable}
              >
                {borrowLoading ? "Borrowing..." : "Borrow"}
              </button>
            )}

            {/* Log in button (Ebook only) */}
            {derived.isEbook && !user?._id && (
              <Link to="/login" className="btn btn-primary">
                Log In to Borrow
              </Link>
            )}

            {/*Hold button (Physical only) */}
            {derived.isHoldablePhysical && user?._id && (
              <button
                className="btn btn-secondary"
                onClick={handlePlaceHold}
                disabled={holdDisabled}
                title={
                  !derived.isAvailable
                    ? "No copies available"
                    : activeHoldsCount >= 3
                    ? "You already have 3 active holds"
                    : activeBorrowsCount >= 5
                    ? "You already have 5 active borrows"
                    : alreadyHeld
                    ? "You already have an active hold for this book"
                    : ""
                }
              >
                {holdLoading ? "Placing hold..." : "Place Hold (2 days)"}
              </button>
            )}

            {/*if logged out and physical, show login CTA */}
            {derived.isHoldablePhysical && !user?._id && (
              <Link to="/login" className="btn btn-secondary">
                Log In to Place Hold
              </Link>
            )}
          </div>
        </div>
      </div>

      <BookReviews bookId={bookId} />
    </div>
  );
}
