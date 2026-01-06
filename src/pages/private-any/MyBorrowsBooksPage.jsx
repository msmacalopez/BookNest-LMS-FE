import React from "react";

export default function MyBorrowsBooksPage() {
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-3">My Borrows</h1>
      <hr />
      {/* Whole TABLE */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed Date</th>
              <th>Expected Return</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">The Odisea</div>
                    <div className="badge badge-ghost badge-sm">Paperback</div>
                  </div>
                </div>
              </td>
              <td>
                15/05/2025
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>20/05/2025</td>
              <th>
                <div className="badge badge-error">Overdue</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-success">Returned</div>
                <span> </span>
                {/* Only if reviewed */}
                <div className="badge badge-primary">Reviewed</div>
              </th>
              <th>
                {/* only if returned: */}
                <button className="btn btn-info max-h-7 rounded-2xl">
                  Review
                </button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          {/* <tfoot className="flex items-center"></tfoot> */}
        </table>
        {/* Positioning */}
        <div className="flex justify-center">
          <div className="join grid grid-cols-2 mx-auto">
            <button className="join-item btn btn-outline">Previous page</button>
            <button className="join-item btn btn-outline">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
