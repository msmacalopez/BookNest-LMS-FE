import { useState, useEffect, useMemo } from "react";
import { changePasswordAPI } from "../../features/user/userAPI";
import { updateMyDetailsAction } from "../../features/user/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthReady } = useSelector((state) => state.authStore);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    address: "",
    phone: "",
    //not password (separate)
  });

  const [pwData, setPwData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // ---- helpers ----
  const safeUser = user && typeof user === "object" ? user : null;

  const membershipNumber = useMemo(() => {
    // best: have a dedicated field in schema, but for now use _id (or last 6 chars)
    const id = safeUser?._id || "";
    return id ? id.slice(-6).toUpperCase() : "—";
  }, [safeUser?._id]);

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString();
  };

  //populate form when user loggs in
  useEffect(() => {
    if (!safeUser?._id) return;

    setFormData({
      email: safeUser.email || "",
      fname: safeUser.fName || "",
      lname: safeUser.lName || "",
      address: safeUser.address || "",
      phone: safeUser.phone || "",
    });
  }, [safeUser?._id]);

  const handleSaveDetails = async () => {
    if (!safeUser?._id) return toast.error("No user loaded");

    // basic validation
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.address ||
      !formData.phone
    ) {
      return toast.error("Please fill all required fields");
    }

    // send only editable fields (not change role/status/email)
    const payload = {
      fName: formData.fname.trim(),
      lName: formData.lname.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      // email: formData.email.trim(), // only include if you want to allow email updates
    };

    try {
      await dispatch(updateMyDetailsAction(payload));
      setIsEditingDetails(false);
    } catch (e) {
      // toast already handled in action
    }
  };

  const handleCancelDetails = () => {
    setIsEditingDetails(false);

    if (safeUser?._id) {
      setFormData({
        email: safeUser.email || "",
        fname: safeUser.fName || "",
        lname: safeUser.lName || "",
        address: safeUser.address || "",
        phone: safeUser.phone || "",
      });
    }
  };

  const handlePasswordSave = async () => {
    // frontend validation BEFORE calling backend
    if (
      !pwData.currentPassword ||
      !pwData.newPassword ||
      !pwData.confirmNewPassword
    ) {
      return toast.error("Please fill all password fields");
    }
    if (pwData.newPassword !== pwData.confirmNewPassword) {
      return toast.error("New passwords do not match");
    }
    if (pwData.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }
    try {
      const res = await changePasswordAPI(pwData);
      toast.success(res?.message || "Password updated. Please log in again.");
      // clear local and log out user
      setPwData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      //log out action
      dispatch(logOut());
      //redirect to login page
      navigate("/login");
    } catch (e) {
      toast.error(e?.message || "Failed to update password");
    }
  };

  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    setPwData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  //UI guard while auth loads
  if (!isAuthReady) {
    return <div className="p-6">Loading...</div>;
  }

  if (!safeUser?._id) {
    return <div className="p-6">Please log in to view your profile.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side */}
      <div>
        <h1 className="text-primary text-2xl font-bold mb-3">Member Details</h1>
        <hr />
        <br />
        <fieldset className="fieldset bg-base-300 dark:!bg-gray-600  border-base-300 rounded-box border p-4 w-full min-h-[60vh] flex flex-col items-center justify-center">
          {/* Email-> read only */}
          <label className="label text-left">Email</label>
          <input
            type="text"
            className="input"
            value={formData.email}
            disabled
          />

          <label className="label text-left">Name</label>
          <input
            type="text"
            className="input"
            value={formData.fname}
            disabled={!isEditingDetails}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
          />
          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            value={formData.lname}
            disabled={!isEditingDetails}
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
          />
          <label className="label">Address</label>
          <input
            type="text"
            className="input"
            value={formData.address}
            disabled={!isEditingDetails}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <label className="label">Phone</label>
          <input
            type="text"
            className="input"
            value={formData.phone}
            disabled={!isEditingDetails}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <div className="mt-4 flex gap-3 flex-wrap">
            {!isEditingDetails ? (
              <button
                className="btn btn-neutral"
                onClick={() => setIsEditingDetails(true)}
              >
                Modify details
              </button>
            ) : (
              <>
                <button className="btn btn-neutral" onClick={handleSaveDetails}>
                  Save Changes
                </button>
                <button className="btn btn-ghost" onClick={handleCancelDetails}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </fieldset>
      </div>

      {/* Right Side */}
      <div>
        <h1 className="text-primary text-2xl font-bold mb-3">My Membership</h1>
        <hr />
        {/* Whole TABLE */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Membership Number</th>
                <th>Credentials</th>
                <th>Starting Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>{membershipNumber}</td>
                <td className="capitalize">{safeUser.role || "member"}</td>
                <td>{formatDate(safeUser.createdAt)}</td>
                <td>
                  <div
                    className={`badge ${
                      safeUser.status === "active"
                        ? "badge-success"
                        : safeUser.status === "inactive"
                        ? "badge-neutral"
                        : safeUser.status === "suspended"
                        ? "badge-warning"
                        : safeUser.status === "deactivated"
                        ? "badge-error"
                        : "badge-ghost"
                    }`}
                  >
                    {safeUser.status || "—"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Separate password button */}
        <div className="grid gap-3 mt-10">
          <h2 className="text-lg font-bold">Wants to change password?</h2>
          {!isChangingPassword ? (
            <button
              className="btn btn-outline"
              onClick={() => setIsChangingPassword(true)}
            >
              Click to Change Password
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={handleCancelPassword}>
              Cancel password
            </button>
          )}
        </div>
        {/* CHange Password */}
        {isChangingPassword && (
          <div className="grid gap-2 text-xs mt-2">
            <label className="label">Current Password</label>
            <input
              type="password"
              className="input"
              value={pwData.currentPassword}
              onChange={(e) =>
                setPwData({ ...pwData, currentPassword: e.target.value })
              }
            />

            <label className="label">New Password</label>
            <input
              type="password"
              className="input"
              value={pwData.newPassword}
              onChange={(e) =>
                setPwData({ ...pwData, newPassword: e.target.value })
              }
            />

            <label className="label">Confirm New Password</label>
            <input
              type="password"
              className="input"
              value={pwData.confirmNewPassword}
              onChange={(e) =>
                setPwData({ ...pwData, confirmNewPassword: e.target.value })
              }
            />

            <div>
              <button
                className="btn btn-outline mt-3"
                onClick={handlePasswordSave}
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
