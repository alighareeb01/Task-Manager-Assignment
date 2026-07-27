import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const backend_url = import.meta.env.VITE_API_URL;
export default function TaskCard({ task, getStats, getTasks, onEdit }) {
  const { token } = useContext(AuthContext);
  const getStatusStyle = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-400";

      case "In Progress":
        return "bg-blue-500/20 text-blue-400";

      case "To Do":
        return "bg-gray-500/20 text-gray-300";

      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";

      case "Low":
        return "bg-green-500/20 text-green-400";

      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;
    try {
      const res = await axios.delete(`${backend_url}api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getTasks();
      await getStats();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      {/* Title */}
      <h2 className="text-xl font-bold text-white">{task?.title}</h2>

      {/* Description */}
      <p className="mt-3 line-clamp-3 text-sm text-slate-400">
        {task?.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
            task?.status,
          )}`}
        >
          {task?.status}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityStyle(
            task?.priority,
          )}`}
        >
          {task?.priority}
        </span>
      </div>

      {/* Due Date */}
      {task?.dueDate && (
        <p className="mt-5 text-sm text-slate-400">
          Due:
          <span className="text-white">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
