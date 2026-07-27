import React from "react";

export default function DashboardHeader({ openCreateModal, user }) {
  return (
    <div className="p-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold">Hello, {user?.name} </h1>

        <p className="mt-2 text-slate-400">Manage your tasks efficiently.</p>
      </div>

      <button
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        onClick={openCreateModal}
      >
        + Add Task
      </button>
    </div>
  );
}
