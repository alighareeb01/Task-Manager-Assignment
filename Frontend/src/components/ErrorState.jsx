import React from "react";

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="m-4 mx-auto mt-10 flex max-w-xl flex-col items-center rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
      <div className="mb-4 text-5xl">⚠️</div>

      <h2 className="text-xl font-semibold text-white">
        Oops! Something went wrong.
      </h2>

      <p className="mt-2 text-slate-400">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
