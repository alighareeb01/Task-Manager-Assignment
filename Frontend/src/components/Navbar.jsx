import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-xl font-bold tracking-tight text-white transition hover:text-slate-200"
        >
          Task Manager
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/80 p-1.5 backdrop-blur-xl shadow-xl shadow-black/40">
          {" "}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-full px-6 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-white text-slate-950 shadow-md scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-full px-6 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-white text-slate-950 shadow-md scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`
            }
          >
            Register
          </NavLink>
          <button
            // onClick={handleLogout}
            className="rounded-full px-6 py-2 text-xs font-semibold tracking-wider text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
          >
            Logout
          </button>
          {/* User */}
          <div className="ml-2 rounded-full border-l border-slate-700 pl-4 pr-2">
            <span className="text-xs font-medium text-slate-300">
              Hello, <span className="text-white">Ali</span>
            </span>
          </div>
        </div>
        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-slate-700/60 bg-slate-900/80 p-2 text-white backdrop-blur-md shadow-lg shadow-black/40 transition hover:bg-slate-800 md:hidden"
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="mx-4 mt-4 rounded-3xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-md shadow-lg shadow-black/40 md:hidden">
          <p className="mb-4 border-b border-slate-700 pb-3 text-sm text-slate-300">
            Hello, <span className="font-semibold text-white">Ali</span>
          </p>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              register
            </NavLink>

            <button
              // onClick={handleLogout}
              className="rounded-full px-5 py-3 text-left text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
