import React from "react";
import { Link } from "react-router-dom";

export default function BorrowManagementPage() {
  return (
    <div>
      {/* Title */}
      <h1 className="text-primary text-2xl font-bold mb-3">
        Borrows Management
      </h1>
      <hr />
      <br />
      {/* 2columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <form action="">
              <label className="label">Status</label>
              <div className="flex gap-3">
                <select className="select select-bordered w-full">
                  <option value="" disabled selected>
                    --- Select Edition ---
                  </option>
                  <option value="borrowed">Borrowed</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="returned">Returned</option>
                  <option value="reviewed">Reviewed</option>
                </select>
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Borrow ID</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="BW1234"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>
            <form action="">
              <label className="label">Title</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Title of book"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Author</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Author Name"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">ISBN</label>
              <div className="flex gap-3">
                {" "}
                <input
                  type="text"
                  className="input w-full"
                  inputMode="numeric"
                  placeholder="ISBN-10 or ISBN-13"
                  pattern="^(97(8|9))?\d{9}(\d|X)$"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Genre</label>
              <div className="flex gap-3">
                {" "}
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. Drama, Action"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>
          </fieldset>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <form action="">
              <label className="label">Member</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. Member Name"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Member ID</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. M1234"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Edition</label>
              <div className="flex gap-3">
                <select className="select select-bordered w-full">
                  <option value="" disabled selected>
                    --- Select Edition ---
                  </option>
                  <option value="paperback">Paperback</option>
                  <option value="paperback">Hardcover</option>
                  <option value="paperback">Kindle</option>
                  <option value="digital">Audio</option>
                </select>
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Language</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. English"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>

            <form action="">
              <label className="label">Publisher</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g. Patagonia Editions"
                />
                <button className="btn btn-primary mx-auto block">
                  Search in Borrows
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      </div>

      <Link to="/dashboard/borrows/resultborrows" className="btn btn-error">
        Fake Result
      </Link>
    </div>
  );
}
