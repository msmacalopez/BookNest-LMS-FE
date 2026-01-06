import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "maca@gmail.com",
    // password: "123456",
    fname: "Maca",
    lname: "Smith",
    address: "123 Main St, City, Country",
    phone: "0426611400",
  });

  return (
    <div>
      <fieldset className="fieldset bg-primary-content border-base-300 rounded-box border p-4 w-full min-h-[70vh]">
        <legend className="fieldset-legend text-xl">Your Details</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={formData.email}
          disabled={true}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          value={formData.fname}
          disabled={!isEditing}
          onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
        />
        <label className="label">Lastname</label>
        <input
          type="text"
          className="input"
          value={formData.lname}
          disabled={!isEditing}
          onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
        />
        <label className="label">Address</label>
        <input
          type="text"
          className="input"
          value={formData.address}
          disabled={!isEditing}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <label className="label">Phone</label>
        <input
          type="text"
          className="input"
          value={formData.phone}
          disabled={!isEditing}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <div className="mt-4 flex gap-3">
          {!isEditing ? (
            <button
              className="btn btn-neutral"
              onClick={() => setIsEditing(true)}
            >
              Modify details
            </button>
          ) : (
            <>
              <button className="btn btn-neutral">Save Changes</button>
              <button
                className="btn btn-ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </fieldset>
    </div>
  );
}
