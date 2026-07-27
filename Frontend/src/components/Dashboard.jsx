import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import Modal from "./Modal";
import ErrorState from "./ErrorState";

const backend_url = import.meta.env.VITE_API_URL;
export default function Dashboard() {
  const [searchInput, setSearchInput] = useState({
    searchtitle: "",
    status: "",
    priority: "",
  });
  const [tasksError, setTasksError] = useState("");
  const [statsError, setStatsError] = useState("");

  const { token, user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [tasks, setTasks] = useState([]);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats?.totalTasks,
    },
    {
      title: "Completed",
      value: stats?.completedTasks,
    },
    {
      title: "Pending",
      value: stats?.pendingTasks,
    },
  ];
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  async function getStats() {
    setLoadingStats(true);
    try {
      const res = await axios.get(`${backend_url}api/tasks/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.data.stats);
    } catch (err) {
      console.error(err);
      setStatsError("Failed to load statistics.");
    } finally {
      setLoadingStats(false);
    }
  }

  async function getTasks() {
    setLoadingTasks(true);

    try {
      const res = await axios.get(`${backend_url}api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: searchInput.searchtitle,
          status: searchInput.status,
          priority: searchInput.priority,
        },
      });
      setTasks(res.data.data.tasks);
    } catch (err) {
      console.error(err);
      setTasksError("Failed to load statistics.");
    } finally {
      setLoadingTasks(false);
    }
  }

  useEffect(() => {
    if (!token) return;

    getStats();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    getTasks();
  }, [token, searchInput]);

  function openCreateModal() {
    setSelectedTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setSelectedTask(task);
    setModalOpen(true);
  }

  return (
    <>
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

      {/* modal */}

      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          getTasks={getTasks}
          getStats={getStats}
          task={selectedTask}
          edit={!!selectedTask}
        />
      )}

      {/* Stats */}
      {loadingStats ? (
        <Loader num={3} />
      ) : statsError ? (
        <ErrorState message={statsError} onRetry={getStats} />
      ) : (
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
      )}

      {/* search bar */}
      <SearchBar setSearchInput={setSearchInput} />

      {/* tasks */}
      {loadingTasks ? (
        <Loader num={8} />
      ) : tasksError ? (
        <ErrorState message={tasksError} onRetry={getTasks} />
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="p-4 mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              getStats={getStats}
              getTasks={getTasks}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}
    </>
  );
}
