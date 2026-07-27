import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const stats = [
  {
    title: "Total Tasks",
    value: 12,
  },
  {
    title: "Completed",
    value: 5,
  },
  {
    title: "Pending",
    value: 7,
  },
];
export default function Dashboard() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <div className="p-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Hello, {user?.name} </h1>

          <p className="mt-2 text-slate-400">Manage your tasks efficiently.</p>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
          + Add Task
        </button>
      </div>
      {/* Stats */}
      <div className="p-4 mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg"
          >
            <p className="text-slate-400">{stat.title}</p>

            <h2 className="mt-3 text-4xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
