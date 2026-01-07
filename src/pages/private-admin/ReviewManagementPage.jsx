import React from "react";
import { Link } from "react-router-dom";

export default function ReviewManagementPage() {
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-center justify-between">
        <h1 className="text-primary text-2xl font-bold mb-3">
          Reviews Management
        </h1>

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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
            <button className="btn btn-primary mx-auto block rounded-full max-h-9">
              Search Reviews
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
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Date of Review</th>
              <th>Review Comments</th>
              <th>Score Given</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold min-w-30">Title of Book</div>
                    <div className="text-sm opacity-50">Score: 5</div>
                  </div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>1111111111111</td>
              <td>M1234</td>
              <td>Maca Lopez</td>
              <td>25/05/2025</td>
              <td>Terrible Book</td>
              <td>1</td>
              <td>Pending</td>
              {/* Actions */}
              <td className="flex flex-col">
                <button className="btn btn-success max-h-6 w-20 mb-2">
                  Approve
                </button>
                <button className="btn btn-error max-h-6 w-20 mt-2">
                  Delete
                </button>
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
