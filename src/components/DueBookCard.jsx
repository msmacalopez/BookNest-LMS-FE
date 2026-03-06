import React from "react";

const DueBookCard = ({ nextDue, loading = false }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 md:p-6 mb-6 md:mb-8">
        <p className="text-sm font-semibold text-red-700">Next Due</p>
        <div className="mt-3 text-2xl md:text-3xl font-bold text-[#1e293b]">
          …
        </div>
        <p className="mt-2 text-sm text-red-700">Loading due information...</p>
      </div>
    );
  }

  if (!nextDue) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 md:p-6 mb-6 md:mb-8">
        <p className="text-sm font-semibold text-green-700">Next Due</p>
        <div className="mt-3 text-xl md:text-2xl font-bold text-[#1e293b]">
          No active due books
        </div>
        <p className="mt-2 text-sm text-green-700">
          You have no current books due right now.
        </p>
      </div>
    );
  }

  const isUrgent =
    nextDue.urgencyType === "overdue" || nextDue.urgencyType === "today";

  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 mb-6 md:mb-8 ${
        isUrgent ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`text-sm font-semibold ${
              isUrgent ? "text-red-700" : "text-amber-700"
            }`}
          >
            Next Due
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#1e293b]">
            {nextDue.title}
          </h2>

          {nextDue.author ? (
            <p className="mt-1 text-sm text-gray-600">{nextDue.author}</p>
          ) : null}

          <p className="mt-3 text-sm text-gray-600">
            Due date:{" "}
            <span className="font-semibold text-[#1e293b]">
              {new Date(nextDue.dueDate).toLocaleDateString()}
            </span>
          </p>

          <p
            className={`mt-2 text-sm font-semibold ${
              isUrgent ? "text-red-700" : "text-amber-700"
            }`}
          >
            {nextDue.urgencyText}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-2xl px-3 py-2 text-xs font-semibold ${
            isUrgent ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          Important
        </div>
      </div>
    </div>
  );
};

export default DueBookCard;
