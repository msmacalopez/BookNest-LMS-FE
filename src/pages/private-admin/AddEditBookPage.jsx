// AddEditBookPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  addBookAdminAction,
  updateBookAdminAction,
  fetchBookByIdAdminAction,
  uploadBookCoverAction,
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

const statusBadgeClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "badge-success";
    case "inactive":
      return "badge-neutral";
    default:
      return "badge-ghost";
  }
};

export default function AddEditBookPage() {
  const { id } = useParams(); // undefined on /new
  const isNew = !id || id === "new";
  const isEdit = !isNew;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const title = useMemo(() => (isNew ? "Add Book" : "Edit Book"), [isNew]);

  // Populate on edit
  useEffect(() => {
    const run = async () => {
      if (!isEdit) {
        setForm(emptyForm);
        return;
      }

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
        status: (data.status || "active").toLowerCase(),
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

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    const fd = new FormData();
    fd.append("coverImage", selectedFile);

    setUploadingImage(true);

    const res = await dispatch(uploadBookCoverAction(fd));
    const status = res?.payload?.status || res?.status;
    const data = res?.payload?.data || res?.data;

    setUploadingImage(false);

    if (status !== "success" || !data?.url) {
      toast.error(
        res?.payload?.message || res?.message || "Image upload failed"
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      coverImageUrl: data.url,
    }));

    toast.success("Image uploaded successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields (coverImageUrl intentionally NOT required)
    const requiredFields = [
      "status",
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

    const payload = {
      status: (form.status || "inactive").toLowerCase(),
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

      ...(form.coverImageUrl?.trim()
        ? { coverImageUrl: form.coverImageUrl.trim() }
        : {}),
    };

    setLoading(true);

    const res = isEdit
      ? await dispatch(updateBookAdminAction(id, payload))
      : await dispatch(addBookAdminAction(payload));

    const status = res?.payload?.status || res?.status;

    setLoading(false);

    if (status !== "success") {
      toast.error(res?.payload?.message || res?.message || "Save failed");
      return;
    }

    toast.success(isEdit ? "Book updated" : "Book added");
    navigate("/dashboard/books");
  };

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className={`badge ${statusBadgeClass(form.status)}`}>
              {form.status}
            </span>
          </div>
          <p className="text-sm opacity-70">
            {isNew
              ? "Create a new book record"
              : "Update book details and inventory"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(-1)}
            disabled={loading || uploadingImage}
          >
            ← Back
          </button>
          <button
            className="btn btn-sm"
            onClick={() => navigate("/dashboard/books")}
            disabled={loading || uploadingImage}
          >
            Books
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-2">
          <div className="flex justify-between items-center">
            {/* <h2 className="font-semibold text-base opacity-80">Book Details</h2> */}
            {(loading || uploadingImage) && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </div>
          {/* <div className="divider my-2"></div> */}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 text-base"
          >
            {/* STATUS */}
            <label className="form-control w-full md:col-span-2">
              <div className="label py-1">
                <span className="label-text font-semibold">Status</span>
              </div>
              <select
                className="select select-bordered select-sm w-full text-base"
                value={form.status}
                onChange={setField("status")}
                disabled={loading || uploadingImage}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            {/* TITLE */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Title</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.title}
                onChange={setField("title")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* AUTHOR */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Author</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.author}
                onChange={setField("author")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* YEAR */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">
                  Publication Year
                </span>
              </div>
              <input
                type="number"
                className="input input-bordered input-sm w-full text-base"
                value={form.publicationYear}
                onChange={setField("publicationYear")}
                min="1000"
                max={new Date().getFullYear()}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* ISBN */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">ISBN</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.isbn}
                onChange={setField("isbn")}
                inputMode="numeric"
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* GENRE */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Genre</span>
              </div>
              <select
                className="select select-bordered select-sm w-full text-base"
                value={form.genre}
                onChange={setField("genre")}
                disabled={loading || uploadingImage}
                required
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
            </label>

            {/* EDITION */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Edition / Type</span>
              </div>
              <select
                className="select select-bordered select-sm w-full text-base"
                value={form.typeEdition}
                onChange={setField("typeEdition")}
                disabled={loading || uploadingImage}
                required
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
            </label>

            {/* DESCRIPTION */}
            <label className="form-control w-full md:col-span-2">
              <div className="label py-1">
                <span className="label-text font-semibold">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full text-base"
                rows={4}
                value={form.description}
                onChange={setField("description")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* LANGUAGE */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Language</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.language}
                onChange={setField("language")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* COUNTRY */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Country</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.country}
                onChange={setField("country")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* PUBLISHER */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Publisher</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.publisher}
                onChange={setField("publisher")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* PAGES */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Pages</span>
              </div>
              <input
                type="number"
                min="1"
                className="input input-bordered input-sm w-full text-base"
                value={form.pages}
                onChange={setField("pages")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* QUANTITY */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Quantity Total</span>
              </div>
              <input
                type="number"
                min="0"
                className="input input-bordered input-sm w-full text-base"
                value={form.quantityTotal}
                onChange={setField("quantityTotal")}
                disabled={loading || uploadingImage}
                required
              />
            </label>

            {/* COVER IMAGE UPLOAD */}
            <label className="form-control w-full md:col-span-2">
              <div className="label py-1">
                <span className="label-text font-semibold">
                  Cover Image (optional)
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-sm w-full"
                  onChange={handleFileChange}
                  disabled={loading || uploadingImage}
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleUploadImage}
                    disabled={!selectedFile || loading || uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Uploading
                      </>
                    ) : (
                      "Upload Image"
                    )}
                  </button>

                  {form.coverImageUrl && (
                    <a
                      href={form.coverImageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      View Current Image
                    </a>
                  )}
                </div>

                {selectedFile && !form.coverImageUrl && (
                  <p className="text-xs opacity-70">
                    Selected file: {selectedFile.name}
                  </p>
                )}

                {form.coverImageUrl && (
                  <>
                    <input
                      className="input input-bordered input-sm w-full text-base"
                      value={form.coverImageUrl}
                      onChange={setField("coverImageUrl")}
                      disabled={loading || uploadingImage}
                      placeholder="https://..."
                    />

                    <div className="w-32 h-44 rounded-lg overflow-hidden border bg-base-200">
                      <img
                        src={form.coverImageUrl}
                        alt="Book cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
            </label>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => navigate("/dashboard/books")}
                disabled={loading || uploadingImage}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={loading || uploadingImage}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Saving
                  </>
                ) : isEdit ? (
                  "Save Book"
                ) : (
                  "Add Book"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-xs opacity-60 mt-3">
        Tip: Set to “Inactive” to hide from public catalog.
      </p>
    </div>
  );
}
