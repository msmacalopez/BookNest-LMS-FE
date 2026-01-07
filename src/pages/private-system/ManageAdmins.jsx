import React from "react";
import { Link } from "react-router-dom";

export default function ManageAdmins() {
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Librarians Management
        </h1>
        {/* BTN ADD */}
        <Link
          to="/dashboard/editbook/:id"
          className="btn btn-success max-h-8 rounded-full"
        >
          Add Staff
        </Link>
        {/* Search Bar */}
        <label className="input rounded-full max-h-9">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        {/* Filter By Status*/}
        <form action="" className="mb-3 md:mb-0">
          <div className="flex gap-3">
            <select className="select select-bordered w-full rounded-full max-h-9">
              <option value="" disabled selected>
                --- Filter by Status ---
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="btn btn-primary mx-auto block rounded-full max-h-9">
              Search Staff
            </button>
          </div>
        </form>
      </div>
      <hr />
      {/* Whole TABLE */}
      {/* max-w-screen-xl --> too big for my case*/}
      <div className="w-full max-w-full mx-auto overflow-x-auto">
        <table className="table w-full table-auto">
          {/* head */}
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="font-bold min-w-30">L1234</div>
              </td>
              <td>Macarena Lopez</td>
              <td>admin@gmail.com</td>
              {/* Role */}
              <td>
                <div className="flex flex-col gap-2">
                  <div>Admin</div>
                  <button className="btn btn-success max-h-8 w-30 rounded-full whitespace-nowrap">
                    Make Admin
                  </button>
                  <button className="btn btn-error max-h-8 w-30 rounded-full whitespace-nowrap">
                    Make Member
                  </button>
                </div>
              </td>
              {/* Status */}
              <td>
                <div className="flex flex-col  gap-2">
                  <div>Active</div>
                  <button className="btn btn-success max-h-8 w-20 rounded-full whitespace-nowrap">
                    Activate
                  </button>
                  <button className="btn btn-error max-h-8 w-20 rounded-full whitespace-nowrap">
                    Suspend
                  </button>
                </div>
              </td>
              {/* Actions */}
              <td>
                <div className="flex flex-col gap-2">
                  <button className="btn btn-warning max-h-8 w-20 rounded-full">
                    Edit
                  </button>
                  <button className="btn btn-outline-danger border-red-600 max-h-8 w-20 rounded-full">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            {/* row 2 */}
          </tbody>
        </table>
      </div>
      {/* Positioning */}
      <div className="flex justify-center mt-3">
        <div className="join grid grid-cols-2 mx-auto">
          <button className="join-item btn btn-outline">Previous page</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}
