import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  searchtitle: z.string().optional(),
  status: z.enum(["", "To Do", "In Progress", "Done"]),
  priority: z.enum(["", "Low", "Medium", "High"]),
});

export default function SearchBar({ setSearchInput }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  function handleSearch(data) {
    setSearchInput(data);
  }
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
        {/* Search */}
        <input
          type="search"
          id="searchtitle"
          placeholder="Search for task title"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          {...register("searchtitle")}
        />

        {/* Filters + Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            id="status"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
            {...register("status")}
          >
            <option value="">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            id="priority"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
            {...register("priority")}
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              reset({
                searchtitle: "",
                status: "",
                priority: "",
              });

              setSearchInput({
                searchtitle: "",
                status: "",
                priority: "",
              });
            }}
            className="w-full rounded-xl bg-slate-700 px-4 py-3 font-medium text-white hover:bg-slate-600"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
}
