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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side */}
      <div>
        <h1 className="text-primary text-2xl font-bold mb-3">Member Details</h1>
        <hr />
        <br />
        <fieldset className="fieldset bg-base-300 dark:!bg-gray-600  border-base-300 rounded-box border p-4 w-full min-h-[60vh] flex flex-col items-center justify-center">
          <label className="label text-left">Name</label>
          <input
            type="text"
            className="input"
            value={formData.fname}
            disabled={!isEditing}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
          />
          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            value={formData.lname}
            disabled={!isEditing}
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
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
                <td>112345</td>
                <td>Member</td>
                <td>20/05/2025</td>
                <td>
                  <div className="badge badge-success">Active</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
