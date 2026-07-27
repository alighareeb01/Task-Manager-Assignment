import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>

      <p className="mt-3 max-w-md text-slate-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
