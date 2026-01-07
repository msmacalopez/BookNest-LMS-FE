import React from "react";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-4xl font-bold">DashboardHome</h1>
      <h1 className="text-4xl font-bold">ADD some statisticss!!!</h1>
      <p>Different for Members and for Admins</p>
      <p>Member - own stadistics</p>
      <p>
        Admin - Library related stadistics: Total Books, Total books in loan
        total overdue, total genre (for checking if mistakes), total languages?,
        total country?
      </p>
    </div>
  );
}
