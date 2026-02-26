// AddEditBookPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  addBookAdminAction,
  updateBookAdminAction,
  fetchBookByIdAdminAction,
} from "../../features/book/bookAction";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Biography",
  "History",
  "Children's",
  "Romance",
  "Horror",
];

const EDITIONS = ["Hardcover", "Paperback", "Ebook", "Audiobook"];

const emptyForm = {
  status: "inactive",
  title: "",
  author: "",
  publicationYear: "",
  isbn: "",
  description: "",
  genre: "",
  typeEdition: "",
  language: "",
  country: "",
  publisher: "",
  pages: "",
  quantityTotal: "",
  coverImageUrl: "",
};

export default function AddEditBookPage() {
  const { id } = useParams(); // undefined on /new
  const isEdit = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // Populate on edit
  useEffect(() => {
    const run = async () => {
      if (!isEdit) return;

      setLoading(true);

      const res = await dispatch(fetchBookByIdAdminAction(id));
      const status = res?.payload?.status || res?.status;
      const data = res?.payload?.data || res?.data;

      if (status !== "success" || !data) {
        toast.error(
          res?.payload?.message || res?.message || "Failed to load book"
        );
        setLoading(false);
        return;
      }

      setForm({
        status: data.status || "active",
        title: data.title || "",
        author: data.author || "",
        publicationYear: data.publicationYear ?? "",
        isbn: data.isbn || "",
        description: data.description || "",
        genre: data.genre || "",
        typeEdition: data.typeEdition || "",
        language: data.language || "",
        country: data.country || "",
        publisher: data.publisher || "",
        pages: data.pages ?? "",
        quantityTotal: data.quantityTotal ?? "",
        coverImageUrl: data.coverImageUrl || "",
      });

      setLoading(false);
    };

    run();
  }, [dispatch, id, isEdit]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async () => {
    // Required fields (coverImageUrl intentionally NOT required)
    const requiredFields = [
      "title",
      "author",
      "publicationYear",
      "isbn",
      "description",
      "genre",
      "typeEdition",
      "language",
      "country",
      "publisher",
      "pages",
      "quantityTotal",
    ];

    for (const f of requiredFields) {
      if (String(form[f] ?? "").trim() === "") {
        toast.error(`Missing required field: ${f}`);
        return;
      }
    }

    // Base payload
    const payload = {
      status: form.status,
      title: form.title.trim(),
      author: form.author.trim(),
      publicationYear: Number(form.publicationYear),
      isbn: form.isbn.trim(),
      description: form.description.trim(),
      genre: form.genre,
      typeEdition: form.typeEdition,
      language: form.language.trim(),
      country: form.country.trim(),
      publisher: form.publisher.trim(),
      pages: Number(form.pages),
      quantityTotal: Number(form.quantityTotal),

      //do NOT send coverImageUrl if empty
      ...(form.coverImageUrl?.trim()
        ? { coverImageUrl: form.coverImageUrl.trim() }
        : {}),
    };

    setLoading(true);

    const res = isEdit
      ? await dispatch(updateBookAdminAction(id, payload))
      : await dispatch(addBookAdminAction(payload));

    const status = res?.payload?.status || res?.status;

    if (status === "success") {
      toast.success(isEdit ? "Book updated" : "Book added");
      navigate("/dashboard/books"); // change if your list route differs
    } else {
      toast.error(res?.payload?.message || res?.message || "Save failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-3">
        {isEdit ? "Edit Book" : "Add Book"}
      </h1>
      <hr />
      <br />

      {loading && <p className="mb-3">Loading...</p>}

      {/* 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <label className="label">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="Title of book"
              disabled={loading}
            />

            <label className="label">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="Author Name"
              disabled={loading}
            />

            <label className="label">Year</label>
            <input
              name="publicationYear"
              value={form.publicationYear}
              onChange={onChange}
              type="number"
              className="input w-full"
              placeholder="e.g. 1990"
              min="1000"
              max={new Date().getFullYear()}
              disabled={loading}
            />

            <label className="label">ISBN</label>
            <input
              name="isbn"
              value={form.isbn}
              onChange={onChange}
              type="text"
              className="input w-full"
              inputMode="numeric"
              placeholder="ISBN-10 or ISBN-13"
              disabled={loading}
            />

            <label className="label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="textarea textarea-bordered w-full"
              placeholder="Book description"
              rows={4}
              disabled={loading}
            />

            {/* Genre Dropdown */}
            <label className="label">Genre</label>
            <select
              name="genre"
              value={form.genre}
              onChange={onChange}
              className="select select-bordered w-full"
              disabled={loading}
            >
              <option value="" disabled>
                --- Select Genre ---
              </option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
            <label className="label">Edition</label>
            <select
              name="typeEdition"
              value={form.typeEdition}
              onChange={onChange}
              className="select select-bordered w-full"
              disabled={loading}
            >
              <option value="" disabled>
                --- Select Edition ---
              </option>
              {EDITIONS.map((ed) => (
                <option key={ed} value={ed}>
                  {ed}
                </option>
              ))}
            </select>

            <label className="label">Language</label>
            <input
              name="language"
              value={form.language}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="e.g. English"
              disabled={loading}
            />

            <label className="label">Country</label>
            <input
              name="country"
              value={form.country}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="e.g. USA, UK"
              disabled={loading}
            />

            <label className="label">Publisher</label>
            <input
              name="publisher"
              value={form.publisher}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="e.g. Patagonia Editions"
              disabled={loading}
            />

            <label className="label">Pages</label>
            <input
              name="pages"
              value={form.pages}
              onChange={onChange}
              type="number"
              className="input w-full"
              placeholder="e.g. 140"
              min="1"
              disabled={loading}
            />

            <label className="label">Quantity</label>
            <input
              name="quantityTotal"
              value={form.quantityTotal}
              onChange={onChange}
              type="number"
              className="input w-full"
              placeholder="e.g. 100"
              min="0"
              disabled={loading}
            />

            {/* Optional - URL only. If empty, schema default image will be used (on create). */}
            <label className="label">Cover Image URL (optional)</label>
            <input
              name="coverImageUrl"
              value={form.coverImageUrl}
              onChange={onChange}
              type="text"
              className="input w-full"
              placeholder="https://..."
              disabled={loading}
            />
          </fieldset>
        </div>
      </div>

      <button
        className="btn btn-primary mt-6 mx-auto block"
        onClick={onSubmit}
        disabled={loading}
      >
        {isEdit ? "Save Changes" : "Add Book"}
      </button>
    </div>
  );
}
