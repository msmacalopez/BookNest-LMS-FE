import React from "react";

export default function BorrowsResultOfSearch() {
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-3">
        Results from Borrows
      </h1>
      <hr />
      {/* Whole TABLE */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="whitespace-normal">Title</th>
              <th className="whitespace-normal">Borrowed Date</th>
              <th className="whitespace-normal">Expected Return</th>
              <th className="whitespace-normal">Effective Return</th>
              <th className="whitespace-normal">Loan Status</th>
              <th className="whitespace-normal">Days Overdue</th>
              <th className="whitespace-normal">Member ID</th>
              <th className="whitespace-normal">Member Name</th>
              <th className="whitespace-normal">Member Status</th>
              <th className="whitespace-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>The Odyssey</td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <td>30/05/2025</td>
              <th>
                <div className="badge badge-warning">Borrowed</div>
                <span> </span>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th className="text-red-600">
                <div className="inline-flex bg-white px-2 py-0.5 rounded">
                  12
                </div>
              </th>
              <td>M1234</td>
              <td>Maca Lopez</td>
              <th>
                <div className="badge badge-warning">Active</div>
                <span> </span>
                <div className="badge badge-error">Inactive</div>
                <span> </span>
                <div className="badge badge-success">Suspended</div>
              </th>
              <th>
                <button className="btn btn-primary max-h-12 rounded-2xl">
                  Suspend Member
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>The Odyssey</td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <td>30/05/2025</td>
              <th>
                <div className="badge badge-warning">Borrowed</div>
                <span> </span>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th className="text-red-600">
                <div className="inline-flex bg-white px-2 py-0.5 rounded">
                  12
                </div>
              </th>
              <td>M1234</td>
              <td>Maca Lopez</td>
              <th>
                <div className="badge badge-warning">Active</div>
                <span> </span>
                <div className="badge badge-error">Inactive</div>
                <span> </span>
                <div className="badge badge-success">Suspended</div>
              </th>
              <th>
                <button className="btn btn-primary max-h-12 rounded-2xl">
                  Suspend Member
                </button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          {/* <tfoot className="flex items-center"></tfoot> */}
        </table>
      </div>
      {/* Positioning */}
      <div className="flex justify-center">
        <div className="join grid grid-cols-2 mx-auto">
          <button className="join-item btn btn-outline">Previous page</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}
