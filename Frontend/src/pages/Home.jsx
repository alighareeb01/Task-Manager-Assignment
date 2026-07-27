import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
        Manage Your Tasks
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Like Never Before
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
        Organize your work, track priorities, manage deadlines, and stay
        productive with a fast and secure task management application.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Get Started
          </Link>
        )}

        <Link
          to="/login"
          className="rounded-xl border border-slate-600 bg-slate-800/40 px-8 py-4 font-semibold hover:bg-slate-700/50"
        >
          Login
        </Link>
      </div>
    </section>
  );
}
