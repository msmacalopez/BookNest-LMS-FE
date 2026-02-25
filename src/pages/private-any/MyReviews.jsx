import React from "react";

export default function MyReviews() {
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-3">My Reviews</h1>
      <hr />
      {/* Whole TABLE */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Rating</th>
              <th>Review Title</th>
              <th>Comments</th>
              <th>Borrowed On</th>
              <th>Returned On</th>
              <th>Reviewed On</th>
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
                4.3/5
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>Amazing Book</td>
              <td>
                This book was a delightful discover. Mix romance and drama. i
                enjoyed every single page. I highly recommend it to anyone
                looking for a captivating read that combines romance and drama
                in a compelling way.
              </td>
              <td>15/05/2025</td>
              <td>20/05/2025</td>
              <th>30/05/2025</th>
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
