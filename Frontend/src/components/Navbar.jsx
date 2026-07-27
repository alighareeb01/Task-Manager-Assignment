import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/login");
  }

  const navClass = ({ isActive }) =>
    `rounded-full px-6 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
      isActive
        ? "bg-white text-slate-950 shadow-md scale-105"
        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-xl font-bold tracking-tight text-white hover:text-slate-200"
        >
          Task Manager
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/80 p-1.5 shadow-xl md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-full px-6 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Logout
              </button>

              <div className="ml-2 border-l border-slate-700 pl-4">
                <span className="text-xs text-slate-300">
                  Hello, <span className="text-white">{user?.name}</span>
                </span>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-slate-700 p-2 text-white md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-4 mt-4 rounded-3xl border border-slate-700 bg-slate-900 p-5 md:hidden">
          {isAuthenticated && (
            <p className="mb-4 border-b border-slate-700 pb-3 text-sm text-slate-300">
              Hello{" "}
              <span className="font-semibold text-white">{user?.name}</span>
            </p>
          )}

          <div className="flex flex-col gap-2">
            <NavLink to="/" onClick={() => setOpen(false)} className={navClass}>
              Home
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className={navClass}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="rounded-full px-5 py-3 text-left text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={navClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className={navClass}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
