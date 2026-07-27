import React from "react";
import Loader from "./Loader";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import TaskCard from "./TaskCard";

export default function TaskGrid({
  loading,
  error,
  tasks,
  onRetry,
  onEdit,
  getTasks,
  getStats,
}) {
  if (loading) {
    return <Loader num={8} />;
  }
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }
  if (tasks.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="p-4 mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          getStats={getStats}
          getTasks={getTasks}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
