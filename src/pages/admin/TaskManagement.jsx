import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../../components/ScrollAnimation";
import { useTaskContext } from "../../Provider/useTaskContext";

const TaskManagement = () => {
  const {
    tasks,
    getOpenTasks,
    getApprovedTasks,
    getSubmittedTasks,
    getTaskStats,
  } = useTaskContext();

  const [activeTab, setActiveTab] = useState("all");
  const stats = getTaskStats();

  const getDisplayTasks = () => {
    switch (activeTab) {
      case "open":
        return getOpenTasks();
      case "approved":
        return getApprovedTasks();
      case "submitted":
        return getSubmittedTasks();
      default:
        return tasks;
    }
  };

  const displayTasks = getDisplayTasks();

  return (
    <div className="min-h-screen bg-indigo-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-50">
              Task Management
            </h1>
            <p className="mt-2 text-slate-300">Manage and monitor all tasks</p>
          </div>
        </ScrollReveal>

        {/* Statistics */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Total Tasks", value: stats.total },
              { name: "Open Tasks", value: stats.open },
              { name: "Approved Tasks", value: stats.approved },
              { name: "Submitted Tasks", value: stats.submitted },
            ].map((stat) => (
              <motion.div
                key={stat.name}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-900 p-6 rounded-lg shadow-sm shadow-indigo-900/30"
              >
                <dt className="text-sm font-medium text-slate-300">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-400">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal>
          <div className="border-b border-slate-600 mb-8">
            <nav className="-mb-px flex space-x-8">
              {["all", "open", "approved", "submitted"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-slate-400 hover:border-slate-300 hover:text-slate-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab} Tasks
                </button>
              ))}
            </nav>
          </div>
        </ScrollReveal>

        {/* Task List */}
        <ScrollReveal>
          <div className="bg-indigo-900 backdrop-blur-sm shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-indigo-800">
              {displayTasks.map((task) => (
                <motion.li
                  key={task.id}
                  whileHover={{ backgroundColor: "rgba(49, 46, 129, 0.7)" }}
                >
                  <Link
                    to={`/task-details/${task.id}`}
                    className="block hover:bg-indigo-800/50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-indigo-400 truncate">
                            {task.title}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-slate-300">
                            <span className="truncate">{task.description}</span>
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-800 text-indigo-300 capitalize">
                            {task.status}
                          </p>
                          <p className="text-sm text-yellow-500">
                            ${task.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default TaskManagement;
