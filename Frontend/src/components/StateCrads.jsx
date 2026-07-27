import React from "react";

export default function StatsCards({ statCards }) {
  return (
    <div className="p-4 mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg"
        >
          <p className="text-slate-400">{stat.title}</p>
          <h2 className="mt-3 text-4xl font-bold">{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}
