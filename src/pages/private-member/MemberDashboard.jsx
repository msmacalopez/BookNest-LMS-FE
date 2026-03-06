import React from "react";

export default function MemberDashboard() {
  return (
    <div>
      {/* Title */}
      <h1 className="text-primary text-2xl font-bold mb-3">
        Welcome to your Dashboard!
      </h1>
      <hr />
      <br />
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-bold">ADD some statisticss!!!</h1>
          <p>Different for Members and for Admins</p>
          <br />
          <p>
            Member - own stadistics: how many books by year (maybe last 5
            years), how many overdue in the last year, how many borrowed at the
            moment, etc
          </p>
          <p>
            Admin - Library related stadistics: Total Books, Total books in loan
            total overdue, total genre (for checking if mistakes), total
            languages?, total country? -show pending approvals of physical
            borrows? the ones are "requested"
          </p>
          <p>
            For admin also, add a feature to "BORROW" books, like: user input
            (with suggestions), book input (with suggestions)... then button to
            say Rent to User! then the "renting happens"
          </p>
        </div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-lg text-accent">
            Borrow Tab
          </legend>

          <label className="label">Enter Member Number, email or Scan</label>
          <input type="text" className="input" placeholder="e.g. M1234" />

          <label className="label">Enter Book ISBN or Scan</label>
          <input
            type="text"
            className="input"
            placeholder="e.g. 1232434988876X"
          />

          <button className="btn btn-primary mt-4">Rent to User</button>
        </fieldset>
      </div>
    </div>
  );
}
