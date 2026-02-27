// AddEditUserByAdmin.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchUserByIdSuperAdminAction,
  createUserSuperAdminAction,
  updateUserSuperAdminAction,
} from "../../features/user/userAction";

const emptyForm = {
  role: "member",
  status: "active",
  fName: "",
  lName: "",
  address: "",
  email: "",
  phone: "",
  password: "",
};

const statusBadgeClass = (status) => {
  switch (status) {
    case "active":
      return "badge-success";
    case "inactive":
      return "badge-neutral";
    case "suspended":
      return "badge-warning";
    case "deactivated":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export default function AddEditUserByAdmin() {
  const { id } = useParams();
  const isNew = !id || id === "new";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authStore || {});
  const myId = user?._id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const title = useMemo(() => (isNew ? "Add User" : "Edit User"), [isNew]);

  // ✅ Block self-edit on this page (UX guard)
  useEffect(() => {
    if (!isNew && myId && String(myId) === String(id)) {
      toast.error("You cannot edit your own account from this page.");
      navigate("/dashboard/admins");
    }
  }, [isNew, myId, id, navigate]);

  useEffect(() => {
    const load = async () => {
      if (isNew) {
        setForm(emptyForm);
        return;
      }

      setLoading(true);
      const res = await dispatch(fetchUserByIdSuperAdminAction(id));

      if (res?.status !== "success") {
        toast.error(res?.message || "Failed to load user");
        setLoading(false);
        return;
      }

      const u = res?.data || {};
      setForm({
        role: (u.role || "member").toLowerCase(),
        status: (u.status || "active").toLowerCase(),
        fName: u.fName || "",
        lName: u.lName || "",
        address: u.address || "",
        email: u.email || "",
        phone: u.phone || "",
        password: "",
      });

      setLoading(false);
    };

    load();
  }, [id, isNew, dispatch]);

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ hard stop self update from UI too
    if (!isNew && myId && String(myId) === String(id)) {
      toast.error("You cannot edit your own account from this page.");
      return;
    }

    setLoading(true);

    const payload = {
      role: (form.role || "").toLowerCase(),
      status: (form.status || "").toLowerCase(),
      fName: form.fName.trim(),
      lName: form.lName.trim(),
      address: form.address.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (isNew) {
      if (!form.password.trim()) {
        toast.error("Password is required for new users");
        setLoading(false);
        return;
      }
      payload.password = form.password.trim();
    }

    const res = isNew
      ? await dispatch(createUserSuperAdminAction(payload))
      : await dispatch(updateUserSuperAdminAction(id, payload));

    setLoading(false);

    if (res?.status !== "success") {
      toast.error(res?.message || "Save failed");
      return;
    }

    toast.success(res?.message || "Saved");
    navigate("/dashboard/admins");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
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
              ? "Create a new user account"
              : "Update user details and permissions"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            ← Back
          </button>
          <button
            className="btn btn-sm"
            onClick={() => navigate("/dashboard/admins")}
            disabled={loading}
          >
            Users
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="card bg-base-100 shadow-sm mt-4">
        <div className="card-body p-5">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-semibold text-base opacity-80">User Details</h2>
            {loading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </div>

          <div className="divider my-2"></div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 text-base"
          >
            {/* ROLE */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Role</span>
              </div>
              <select
                className="select select-bordered select-sm w-full text-base"
                value={form.role}
                onChange={setField("role")}
                disabled={loading}
              >
                <option value="member">Member</option>
                <option value="admin">Librarian</option>
              </select>
            </label>

            {/* STATUS */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Status</span>
              </div>
              <select
                className="select select-bordered select-sm w-full text-base"
                value={form.status}
                onChange={setField("status")}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </label>

            {/* FIRST NAME */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">First Name</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.fName}
                onChange={setField("fName")}
                disabled={loading}
                required
              />
            </label>

            {/* LAST NAME */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Last Name</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.lName}
                onChange={setField("lName")}
                disabled={loading}
                required
              />
            </label>

            {/* EMAIL */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Email</span>
              </div>
              <input
                type="email"
                className="input input-bordered input-sm w-full text-base"
                value={form.email}
                onChange={setField("email")}
                disabled={loading}
                required
              />
            </label>

            {/* PHONE */}
            <label className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-semibold">Phone</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.phone}
                onChange={setField("phone")}
                disabled={loading}
                required
              />
            </label>

            {/* ADDRESS */}
            <label className="form-control w-full md:col-span-2">
              <div className="label py-1">
                <span className="label-text font-semibold">Address</span>
              </div>
              <input
                className="input input-bordered input-sm w-full text-base"
                value={form.address}
                onChange={setField("address")}
                disabled={loading}
                required
              />
            </label>

            {/* PASSWORD (new only) */}
            {isNew && (
              <label className="form-control w-full md:col-span-2">
                <div className="label py-1">
                  <span className="label-text font-semibold">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered input-sm w-full text-base"
                  value={form.password}
                  onChange={setField("password")}
                  disabled={loading}
                  required
                  minLength={6}
                />
              </label>
            )}

            {/* BUTTONS */}
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => navigate("/dashboard/admins")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Saving
                  </>
                ) : (
                  "Save User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-xs opacity-60 mt-3">
        Tip: Use “Inactive” to block borrowing. Admin = librarian dashboard.
      </p>
    </div>
  );
}
