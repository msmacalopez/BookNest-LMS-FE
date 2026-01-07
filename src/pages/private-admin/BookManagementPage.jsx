import React from "react";
import { Link } from "react-router-dom";

export default function BookManagementPage() {
  return (
    <div>
      <div className="flex gap-8 items-center">
        <h1 className="text-primary text-2xl font-bold mb-3">Manage Books</h1>
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
        <button className="btn btn-error max-h-8">Delete All Selections</button>
      </div>
      <hr />
      {/* Whole TABLE */}
      <div className="w-full max-w-screen-xl mx-auto overflow-x-auto">
        <table className="table w-screen table-auto">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <span>All </span>
                  <input type="checkbox" className="checkbox w-4 h-4" />
                </label>
              </th>
              <th>Actions</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Edition/Type</th>
              <th>Language</th>
              <th>Country</th>
              <th>Publisher</th>
              <th>Pages</th>
              <th>Quantity</th>
              <th>On Loan</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox w-4 h-4" />
                </label>
              </th>
              <td>
                <Link
                  to="/dashboard/editbook/:id"
                  className="btn btn-warning max-h-6 w-20 mb-2"
                >
                  Edit
                </Link>
                <button className="btn btn-error max-h-6 w-20 mt-2">
                  Delete
                </button>
              </td>
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
                    <div className="font-bold">Title</div>
                    <div className="text-sm opacity-50">Language</div>
                  </div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>1990</td>
              <td>1111111111111</td>
              <td>
                {"Lorem ipsum dolor sit, amet consectetur adipisicing elit Repellendus et".slice(
                  0,
                  30
                )}
              </td>
              <td>Fiction</td>
              <td>Paperback</td>
              <td>English</td>
              <td>UK</td>
              <td>Patagonia Editions</td>
              <td>140p</td>
              <td>100</td>
              <td>20</td>
              <td>80</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox w-4 h-4" />
                </label>
              </th>
              <td>
                <Link
                  to="/dashboard/editbook/:id"
                  className="btn btn-warning max-h-6 w-20 mb-2"
                >
                  Edit
                </Link>
                <button className="btn btn-error max-h-6 w-20 mt-2">
                  Delete
                </button>
              </td>
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
                    <div className="font-bold">Title</div>
                    <div className="text-sm opacity-50">Language</div>
                  </div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>1990</td>
              <td>1111111111111</td>
              <td>
                {"Lorem ipsum dolor sit, amet consectetur adipisicing elit Repellendus et".slice(
                  0,
                  30
                )}
              </td>
              <td>Fiction</td>
              <td>Paperback</td>
              <td>English</td>
              <td>UK</td>
              <td>Patagonia Editions</td>
              <td>140p</td>
              <td>100</td>
              <td>20</td>
              <td>80</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox w-4 h-4" />
                </label>
              </th>
              <td>
                <Link
                  to="/dashboard/editbook/:id"
                  className="btn btn-warning max-h-6 w-20 mb-2"
                >
                  Edit
                </Link>
                <button className="btn btn-error max-h-6 w-20 mt-2">
                  Delete
                </button>
              </td>
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
                    <div className="font-bold">Title</div>
                    <div className="text-sm opacity-50">Language</div>
                  </div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>1990</td>
              <td>1111111111111</td>
              <td>
                {"Lorem ipsum dolor sit, amet consectetur adipisicing elit Repellendus et".slice(
                  0,
                  30
                )}
              </td>
              <td>Fiction</td>
              <td>Paperback</td>
              <td>English</td>
              <td>UK</td>
              <td>Patagonia Editions</td>
              <td>140p</td>
              <td>100</td>
              <td>20</td>
              <td>80</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox w-4 h-4" />
                </label>
              </th>
              <td>
                <Link
                  to="/dashboard/editbook/:id"
                  className="btn btn-warning max-h-6 w-20 mb-2"
                >
                  Edit
                </Link>
                <button className="btn btn-error max-h-6 w-20 mt-2">
                  Delete
                </button>
              </td>
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
                    <div className="font-bold">Title</div>
                    <div className="text-sm opacity-50">Language</div>
                  </div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>1990</td>
              <td>1111111111111</td>
              <td>
                {"Lorem ipsum dolor sit, amet consectetur adipisicing elit Repellendus et".slice(
                  0,
                  30
                )}
              </td>
              <td>Fiction</td>
              <td>Paperback</td>
              <td>English</td>
              <td>UK</td>
              <td>Patagonia Editions</td>
              <td>140p</td>
              <td>100</td>
              <td>20</td>
              <td>80</td>
            </tr>
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
