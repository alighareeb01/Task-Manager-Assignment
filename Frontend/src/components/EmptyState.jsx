import React from "react";

export default function EmptyState() {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-slate-700 bg-slate-800 p-10 text-center">
      <h2 className="text-2xl font-semibold text-white">
        No statistics available
      </h2>

      <p className="mt-3 text-slate-400">
        Create your first task to see your dashboard statistics.
      </p>
    </div>
  );
}
