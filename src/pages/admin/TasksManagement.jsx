import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../../api/adminService";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import Loading from "../../components/ui/Loading";
import Pagination from "../../components/ui/Pagination";

/**
 * Tasks Management Component - Clean and Simple
 * Preserves all backend integration while improving UI/UX
 */
const TasksManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bulkAction, setBulkAction] = useState("");

  const itemsPerPage = 10;

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(difficultyFilter !== "all" && { difficulty: difficultyFilter }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
      };

      const response = await adminService.getTasks(
        currentPage,
        itemsPerPage,
        filters
      );

      // Handle different response formats from backend
      if (response?.data?.tasks) {
        // Format: { data: { tasks: [...], total: 100 } }
        setTasks(response.data.tasks);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else if (response?.tasks) {
        // Format: { tasks: [...], total: 100 }
        setTasks(response.tasks);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } else if (Array.isArray(response)) {
        // Format: [...] (direct array)
        setTasks(response);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
      } else {
        // No data or unknown format
        setTasks([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, difficultyFilter, categoryFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = async (taskId) => {
    try {
      await adminService.deleteTask(taskId);
      setTasks((prev) =>
        prev.filter((task) => (task._id || task.id) !== taskId)
      );
      setSelectedTasks((prev) => prev.filter((id) => id !== taskId));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedTasks.length === 0) return;

    try {
      if (bulkAction === "delete") {
        await Promise.all(
          selectedTasks.map((taskId) => adminService.deleteTask(taskId))
        );
        setTasks((prev) =>
          prev.filter((task) => !selectedTasks.includes(task._id || task.id))
        );
      }
      setSelectedTasks([]);
      setBulkAction("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedTasks((prev) =>
      prev.length === tasks.length
        ? []
        : tasks.map((task) => task._id || task.id)
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-500 text-white",
      inactive: "bg-red-500 text-white",
      pending: "bg-yellow-500 text-white",
      completed: "bg-blue-500 text-white",
      cancelled: "bg-gray-500 text-white",
      open: "bg-green-500 text-white",
      in_progress: "bg-blue-500 text-white",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          statusConfig[status] || statusConfig.pending
        }`}
      >
        {status || "pending"}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      beginner: "bg-green-500 text-white",
      intermediate: "bg-yellow-500 text-white",
      advanced: "bg-orange-500 text-white",
      expert: "bg-red-500 text-white",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          difficultyConfig[difficulty] || difficultyConfig.beginner
        }`}
      >
        {difficulty || "beginner"}
      </span>
    );
  };

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tasks Management</h1>
          <p className="text-gray-400">Manage all platform tasks</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Create Task
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 border border-red-500 rounded-lg bg-red-900/20">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-red-300">{error}</p>
              <button
                onClick={fetchTasks}
                className="px-3 py-1 mt-2 text-sm text-white transition-colors bg-red-600 rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Difficulty
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="backend">Backend Development</option>
              <option value="frontend">Frontend Development</option>
              <option value="fullstack">Full Stack</option>
              <option value="data-science">Data Science</option>
              <option value="ai-ml">AI/ML</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Actions
            </label>
            <button
              onClick={fetchTasks}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-gray-300">
              {selectedTasks.length} task{selectedTasks.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
            <div className="flex items-center space-x-3">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Table */}
      <div className="overflow-hidden bg-gray-800 border border-gray-700 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedTasks.length === tasks.length && tasks.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Applications
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Created
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center">
                    <div className="inline-flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      Loading tasks...
                    </div>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No tasks found
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {tasks.map((task, index) => (
                    <motion.tr
                      key={task._id || task.id || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task._id || task.id)}
                          onChange={() =>
                            toggleTaskSelection(task._id || task.id)
                          }
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">
                            {task.title || "Untitled"}
                          </p>
                          <p className="max-w-xs text-sm text-gray-400 truncate">
                            {task.description || "No description"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="px-6 py-4">
                        {getDifficultyBadge(task.difficulty)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
                          {task.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatCurrency(task.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">
                          {task.applicants?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(task.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-xs text-white bg-blue-600 rounded-full hover:bg-blue-700">
                            View
                          </button>
                          <button className="px-3 py-1 text-xs text-white bg-green-600 rounded-full hover:bg-green-700">
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setTaskToDelete(task);
                              setShowDeleteModal(true);
                            }}
                            className="px-3 py-1 text-xs text-white bg-red-600 rounded-full hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        onConfirm={() =>
          handleDeleteTask(taskToDelete?._id || taskToDelete?.id)
        }
        title="Delete Task"
        message={`Are you sure you want to delete "${
          taskToDelete?.title || "this task"
        }"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      />

      {/* Create Task Modal */}
      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            fetchTasks();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

// Simple Create Task Modal Component
const CreateTaskModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: "",
    requirements: "",
    deliverables: "",
    timeframe: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      await adminService.createTask({
        ...formData,
        price: parseFloat(formData.price),
        status: "open",
      });

      onSuccess();
    } catch (err) {
      setError(err.message);
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="mb-6 text-2xl font-bold text-white">Create New Task</h3>

        {error && (
          <div className="p-4 mb-6 border border-red-500 rounded-lg bg-red-900/20">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="backend">Backend Development</option>
                <option value="frontend">Frontend Development</option>
                <option value="fullstack">Full Stack</option>
                <option value="data-science">Data Science</option>
                <option value="ai-ml">AI/ML</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              required
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Requirements
            </label>
            <textarea
              rows="3"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Deliverables
            </label>
            <textarea
              rows="3"
              value={formData.deliverables}
              onChange={(e) =>
                setFormData({ ...formData, deliverables: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Timeframe
            </label>
            <input
              type="text"
              placeholder="e.g., 1-2 weeks"
              value={formData.timeframe}
              onChange={(e) =>
                setFormData({ ...formData, timeframe: e.target.value })
              }
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TasksManagement;
