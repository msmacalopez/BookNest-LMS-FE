import React from "react";

export default function AddEditBookPage() {
  return (
    <div>
      {/* Title */}
      <h1 className="text-primary text-2xl font-bold mb-3">Add/Edit Book</h1>
      <hr />
      <br />
      {/* 2columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <label className="label">Title</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Title of book"
            />

            <label className="label">Author</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Author Name"
            />

            <label className="label">Year</label>
            <input
              type="number"
              className="input w-full"
              placeholder="e.g. 1990"
              min="1000"
              max={new Date().getFullYear()}
            />

            <label className="label">ISBN</label>
            <input
              type="text"
              className="input w-full"
              inputMode="numeric"
              placeholder="ISBN-10 or ISBN-13"
              pattern="^(97(8|9))?\d{9}(\d|X)$"
            />

            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Book description"
              rows={4}
            />
            <label className="label">Genre</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. Drama, Action"
            />
          </fieldset>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <label className="label">Edition</label>
            <select className="select select-bordered w-full">
              <option value="" disabled selected>
                --- Select Edition ---
              </option>
              <option value="paperback">Paperback</option>
              <option value="paperback">Hardcover</option>
              <option value="paperback">Kindle</option>
              <option value="digital">Audio</option>
            </select>

            <label className="label">Language</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. English"
            />

            <label className="label">Country</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. USA, UK"
            />

            <label className="label">Publisher</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. Patagonia Editions"
            />

            <label className="label">Pages</label>
            <input
              type="number"
              className="input w-full"
              placeholder="e.g. 140"
            />

            <label className="label">Quantity</label>
            <input
              type="number"
              className="input w-full"
              placeholder="e.g. 100"
            />

            <label className="label">File Upload - Cover Image</label>
            <input type="file" className="input w-full" placeholder="" />
          </fieldset>
        </div>
      </div>
      <button className="btn btn-primary mt-6 mx-auto block">
        Add Book/Save Changes
      </button>
    </div>
  );
}
