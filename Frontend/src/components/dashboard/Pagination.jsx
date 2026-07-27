import React from "react";

export default function Pagination({
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
}) {
  function handleNextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="m-2 flex items-center justify-center">
      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ←
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`rounded-xl px-4 py-2 transition ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "border border-slate-700 bg-slate-800 hover:bg-slate-700"
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          disabled={page === totalPages}
          onClick={handleNextPage}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          →
        </button>
      </div>
      <select
        value={limit}
        onChange={(e) => {
          setPage(1);
          setLimit(Number(e.target.value));
        }}
        className="ms-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2"
      >
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}
