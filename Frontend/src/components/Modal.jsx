import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthContext } from "../context/AuthContext";

const backend_url = import.meta.env.VITE_API_URL;

export default function Modal({
  setModalOpen,
  getTasks,
  getStats,
  edit = false,
  task,
}) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    status: z.enum(["To Do", "In Progress", "Done"]),
    priority: z.enum(["Low", "Medium", "High"]),
    dueDate: z.string().min(1, "Due date is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (edit && task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate.split("T")[0],
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "To Do",
        priority: "Low",
        dueDate: "",
      });
    }
  }, [edit, task, reset]);

  async function handleCreateTask(data) {
    if (loading) return;
    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch(`${backend_url}api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      await Promise.all([getStats(), getTasks()]);
      setSuccess("Task created successfully!");
      reset();
      setServerError("");

      setModalOpen(false);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleEditTask(data) {
    if (loading) return;
    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch(`${backend_url}api/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      await Promise.all([getStats(), getTasks()]);
      setSuccess("Task updated successfully!");
      reset();
      setServerError("");

      setModalOpen(false);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => !loading && setModalOpen(false)}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
          {" "}
          <h2 className="mb-6 text-2xl font-bold text-white">
            {edit ? "Edit your task" : "Create New Task"}
          </h2>
          <button
            type="button"
            disabled={loading}
            onClick={() => setModalOpen(false)}
            className="absolute right-4 top-4 text-2xl text-slate-400 hover:text-white disabled:opacity-50"
          >
            ×
          </button>
          <form
            onSubmit={handleSubmit(edit ? handleEditTask : handleCreateTask)}
            className="space-y-5"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Title
              </label>

              {errors.title && (
                <p className="mb-2 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}

              <input
                id="title"
                type="text"
                placeholder="Enter task title"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                {...register("title")}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Description
              </label>

              {errors.description && (
                <p className="mb-2 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}

              <textarea
                id="description"
                rows={4}
                placeholder="Describe your task..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Status
                </label>

                <select
                  id="status"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  {...register("status")}
                  defaultValue="To Do"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  {...register("priority")}
                  defaultValue="Low"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Due Date
              </label>

              {errors.dueDate && (
                <p className="mb-2 text-sm text-red-400">
                  {errors.dueDate.message}
                </p>
              )}

              <input
                id="dueDate"
                type="date"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                {...register("dueDate")}
              />
            </div>

            {/* Submit */}
            {serverError && (
              <p className="text-center text-red-400">{serverError}</p>
            )}

            {success && <p className="text-center text-green-400">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? edit
                  ? "Updating..."
                  : "Creating..."
                : edit
                  ? "Update Task"
                  : "Create Task"}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
