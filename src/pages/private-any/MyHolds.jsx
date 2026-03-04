import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchMyHoldsAction,
  cancelMyHoldAction,
} from "../../features/hold/holdAction";

import { resetMyHolds, setMyHoldsPage } from "../../features/hold/holdSlice";

const fmtDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("en-AU");
};

export default function MyHolds() {
  const dispatch = useDispatch();

  const { items, loading, error, pagination, lastQuery } = useSelector(
    (state) => state.holdStore.myHolds
  );

  const { page = 1, limit = 5 } = lastQuery?.params || {};
  const pages = pagination?.pages || 1;

  useEffect(() => {
    dispatch(resetMyHolds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMyHoldsAction({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleCancel = async (holdId) => {
    const ok = window.confirm("Cancel this hold?");
    if (!ok) return;

    const res = await dispatch(cancelMyHoldAction(holdId));
    if (res?.status !== "success") {
      toast.error(res?.message || "Failed to cancel hold");
      return;
    }

    toast.success(res?.message || "Hold cancelled");
    dispatch(fetchMyHoldsAction({ page, limit }));
  };

  return (
    <div className="w-full min-w-0">
      <h1 className="text-primary text-2xl font-bold mb-3">My Holds</h1>
      <hr className="my-3" />

      <div className="w-full min-w-0 max-w-full overflow-x-auto mt-4">
        <table className="table w-max min-w-[900px]">
          <thead>
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Hold Date</th>
              <th>Expires At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items?.length ? (
              items.map((h) => {
                const title = h.bookTitle || h.bookId?.title || "N/A";
                const isbn = h.bookIsbn || h.bookId?.isbn || "-";
                const holdDate = h.holdDate || h.createdAt;

                const badgeClass =
                  h.status === "fulfilled"
                    ? "badge-success"
                    : h.status === "expired"
                    ? "badge-error"
                    : h.status === "cancelled"
                    ? "badge-info"
                    : "badge-warning";

                const canCancel = h.status === "active";

                return (
                  <tr key={h._id}>
                    <td>
                      <div className="font-bold">{title}</div>
                      <div className="text-sm opacity-50">
                        {h.typeEdition || h.bookId?.typeEdition || "-"}
                      </div>
                    </td>

                    <td>{isbn}</td>

                    <td>
                      <span className={`badge ${badgeClass}`}>{h.status}</span>
                    </td>

                    <td>{fmtDate(holdDate)}</td>
                    <td>{fmtDate(h.expiresAt)}</td>

                    <td className="text-right">
                      {canCancel && (
                        <button
                          className="btn btn-error btn-sm rounded-2xl"
                          disabled={loading}
                          onClick={() => handleCancel(h._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center opacity-60">
                  {loading ? "Loading..." : "No holds found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="join flex justify-center mt-8">
          <button
            className="join-item btn"
            onClick={() => dispatch(setMyHoldsPage(Math.max(1, page - 1)))}
            disabled={page <= 1 || loading}
          >
            «
          </button>

          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`join-item btn ${p === page ? "btn-active" : ""}`}
              onClick={() => dispatch(setMyHoldsPage(p))}
              disabled={loading}
            >
              {p}
            </button>
          ))}

          <button
            className="join-item btn"
            onClick={() => dispatch(setMyHoldsPage(Math.min(pages, page + 1)))}
            disabled={page >= pages || loading}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
