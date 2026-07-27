import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import Modal from "./Modal";
import ErrorState from "./ErrorState";
import Pagination from "./Pagination";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StateCrads";
import TaskGrid from "./TaskGrid";

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
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
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
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  async function getStats() {
    setLoadingStats(true);
    try {
      setStatsError("");
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
      setTasksError("");

      const res = await axios.get(`${backend_url}api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: searchInput.searchtitle,
          status: searchInput.status,
          priority: searchInput.priority,
          page,
          limit,
        },
      });
      console.log("here", res.data);
      setTotalPages(res.data.totalPages);

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
  }, [token, searchInput, page, limit]);

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
      <DashboardHeader openCreateModal={openCreateModal} user={user} />

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
        <StatsCards statCards={statCards} />
        // <div>hello</div>
      )}

      {/* search bar */}
      <SearchBar
        setSearchInput={(data) => {
          setPage(1);
          setSearchInput(data);
        }}
      />

      <TaskGrid
        loading={loadingTasks}
        error={tasksError}
        tasks={tasks}
        onRetry={getTasks}
        onEdit={openEditModal}
        getTasks={getTasks}
        getStats={getStats}
      />

      {/* pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    </>
  );
}
