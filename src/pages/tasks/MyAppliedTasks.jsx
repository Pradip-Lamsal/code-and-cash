import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appliedTasksAPI } from "../../api/appliedTasksService";
import { getCurrentUser, isLoggedIn } from "../../api/authService";
import {
  ScrollReveal,
  ScrollRevealGroup,
} from "../../components/ScrollAnimation";
import { TaskStatusBadge } from "../../components/ui/TaskStatusBadge";
import { ROUTES, STORAGE_KEYS } from "../../constants/appConstants";
import { formatDate } from "../../utils/taskUtils";

/**
 * My Applied Tasks Page Component
 *
 * This component displays all tasks that the logged-in user has applied for.
 * Features include:
 * - Authentication check and redirect to login if not authenticated
 * - Real backend API integration for fetching user's applied tasks
 * - Task filtering by status (applied, in-progress, submitted)
 * - Multiple file upload for task submissions (PDF/DOCX, up to 5 files)
 * - Progress tracking with visual indicators
 * - Responsive design with animations
 * - Real-time status updates from backend
 * - Comprehensive error handling and user feedback
 */
const MyAppliedTasks = () => {
  const navigate = useNavigate();

  // State management
  const [appliedTasks, setAppliedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingTaskId, setUploadingTaskId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");

        // Check if user is logged in
        if (!isLoggedIn()) {
          console.log("User not logged in, redirecting...");
          // Redirect to login page if not authenticated
          navigate(ROUTES.LOGIN);
          return;
        }

        // Get current user data and token
        const currentUser = getCurrentUser();
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

        console.log("Current user:", currentUser);
        console.log("Token exists:", !!token);

        if (!currentUser || !token) {
          console.log("Missing user or token, redirecting...");
          navigate(ROUTES.LOGIN);
          return;
        }

        // Set token in API client
        appliedTasksAPI.setToken(token);
        setUser(currentUser);
        console.log("Authentication successful, user set");
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate(ROUTES.LOGIN);
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch applied tasks from backend API
  const fetchAppliedTasksFromAPI = useCallback(async () => {
    try {
      console.log("Fetching applied tasks from API...");

      // Get applied tasks from backend
      const response = await appliedTasksAPI.getMyAppliedTasks({
        status: "all",
        limit: 50, // Get more tasks to show comprehensive data
        page: 1,
      });

      console.log("API Response:", response);

      // Handle different possible response structures
      let applications = [];

      if (
        response &&
        response.applications &&
        Array.isArray(response.applications)
      ) {
        applications = response.applications;
      } else if (response && Array.isArray(response.data)) {
        applications = response.data;
      } else if (response && Array.isArray(response)) {
        applications = response;
      } else if (
        response &&
        response.data &&
        Array.isArray(response.data.applications)
      ) {
        applications = response.data.applications;
      } else {
        console.warn("Unexpected API response structure:", response);
        return [];
      }

      // Transform backend data to frontend format
      const transformedTasks = applications.map((app) =>
        appliedTasksAPI.transformApplicationData(app)
      );

      console.log("Transformed tasks:", transformedTasks);
      return transformedTasks;
    } catch (error) {
      console.error("Error fetching applied tasks:", error);

      // If authentication error, redirect to login
      if (error.message.includes("token") || error.message.includes("auth")) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        navigate(ROUTES.LOGIN);
        return [];
      }

      throw error;
    }
  }, [navigate]);

  // Load applied tasks from API
  const loadAppliedTasks = useCallback(async () => {
    console.log("Starting to load applied tasks...");
    setIsLoading(true);

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("Loading timeout reached, stopping loading state");
      setIsLoading(false);
      setErrorMessage("Request took too long. Please try again.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 4000);
    }, 15000); // 15 second timeout

    try {
      // Fetch applied tasks for the current user
      const tasks = await fetchAppliedTasksFromAPI();
      clearTimeout(timeoutId);

      // Ensure tasks is an array
      const validTasks = Array.isArray(tasks) ? tasks : [];
      console.log("Setting applied tasks:", validTasks);

      setAppliedTasks(validTasks);
      setFilteredTasks(validTasks);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error loading applied tasks:", error);
      setErrorMessage("Failed to load your applied tasks. Please try again.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 4000);

      // Set empty arrays on error to prevent UI issues
      setAppliedTasks([]);
      setFilteredTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAppliedTasksFromAPI]);

  // Load applied tasks when user is set
  useEffect(() => {
    if (user) {
      console.log("Loading applied tasks for user:", user);
      loadAppliedTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Add refresh functionality for better user experience
  const handleRefresh = useCallback(async () => {
    await loadAppliedTasks();
  }, [loadAppliedTasks]);

  // Filter tasks based on active filter
  useEffect(() => {
    // Ensure appliedTasks is an array before filtering
    const tasksToFilter = Array.isArray(appliedTasks) ? appliedTasks : [];

    const filtered = tasksToFilter.filter((task) => {
      if (!task) return false; // Skip null/undefined tasks

      switch (activeFilter) {
        case "applied":
          return task.status === "applied" || task.status === "pending";
        case "in-progress":
          return (
            task.status === "in-progress" ||
            task.status === "approved" ||
            task.status === "accepted"
          );
        case "submitted":
          return task.status === "submitted" || task.status === "completed";
        default:
          return true;
      }
    });
    setFilteredTasks(filtered);
  }, [activeFilter, appliedTasks]);

  // Handle file upload for task submission
  const handleFileUpload = useCallback(
    async (applicationId, files) => {
      if (!files || files.length === 0) return;

      // Convert single file to array for consistency
      const fileArray = Array.isArray(files) ? files : [files];

      try {
        setUploadingTaskId(applicationId);

        // Submit files through backend API
        const result = await appliedTasksAPI.submitFiles(
          applicationId,
          fileArray
        );

        // Update task status locally
        const updatedTasks = appliedTasks.map((task) => {
          if (task.applicationId === applicationId) {
            return {
              ...task,
              status: "submitted",
              submissionFile: fileArray[0].name, // Show first file name
              submittedAt: new Date().toISOString(),
              progress: result.application?.progress || 100,
              timeRemaining: "Submitted",
              lastUpdated: new Date().toISOString(),
              submissionCount:
                result.application?.submissions?.length || fileArray.length,
              submissions: result.application?.submissions || [],
            };
          }
          return task;
        });

        setAppliedTasks(updatedTasks);

        const fileNames = fileArray.map((f) => f.name).join(", ");
        setSuccessMessage(`Task submitted successfully! Files: ${fileNames}`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage(
          error.message || "Failed to submit task. Please try again."
        );
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 4000);
      } finally {
        setUploadingTaskId(null);
      }
    },
    [appliedTasks]
  );

  // Get progress color based on percentage
  const getProgressColor = (progress) => {
    if (progress >= 100) return "from-emerald-500 to-green-500";
    if (progress >= 75) return "from-blue-500 to-indigo-500";
    if (progress >= 50) return "from-yellow-500 to-orange-500";
    return "from-gray-500 to-gray-600";
  };

  // Filter options
  const filterOptions = [
    {
      key: "all",
      label: "All Tasks",
      count: Array.isArray(appliedTasks) ? appliedTasks.length : 0,
    },
    {
      key: "applied",
      label: "Applied",
      count: Array.isArray(appliedTasks)
        ? appliedTasks.filter(
            (t) => t && (t.status === "applied" || t.status === "pending")
          ).length
        : 0,
    },
    {
      key: "in-progress",
      label: "In Progress",
      count: Array.isArray(appliedTasks)
        ? appliedTasks.filter(
            (t) =>
              t &&
              (t.status === "in-progress" ||
                t.status === "approved" ||
                t.status === "accepted")
          ).length
        : 0,
    },
    {
      key: "submitted",
      label: "Submitted",
      count: Array.isArray(appliedTasks)
        ? appliedTasks.filter(
            (t) => t && (t.status === "submitted" || t.status === "completed")
          ).length
        : 0,
    },
  ];

  // Toast notification component
  const ToastNotification = ({ message, type, show, onClose }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed z-50 flex items-center max-w-md px-4 py-3 border rounded-lg shadow-lg top-4 right-4 backdrop-blur-sm"
          style={{
            background:
              type === "success"
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)"
                : "linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)",
            borderColor:
              type === "success"
                ? "rgba(16, 185, 129, 0.3)"
                : "rgba(239, 68, 68, 0.3)",
          }}
        >
          <div className="flex items-start">
            {type === "success" ? (
              <svg
                className="w-5 h-5 mr-2 text-green-100 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2 text-red-100 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span className="text-sm font-medium text-white">{message}</span>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-white transition-colors hover:text-gray-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-purple-900/10 to-transparent"></div>
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-indigo-500/30 animate-spin border-t-indigo-500"></div>
              <div
                className="absolute w-12 h-12 mx-auto transform -translate-x-1/2 border-4 rounded-full top-2 left-1/2 border-purple-500/30 animate-spin border-t-purple-500"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-slate-50">
              {user ? "Loading Your Applied Tasks" : "Checking Authentication"}
            </h2>
            <p className="text-slate-400">
              {user
                ? "Please wait while we fetch your task applications..."
                : "Please wait while we verify your login status..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notifications */}
      <ToastNotification
        message={successMessage}
        type="success"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
      <ToastNotification
        message={errorMessage}
        type="error"
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-purple-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,_#000_0deg,_#1e1b4b_120deg,_#312e81_240deg,_#000_360deg)] opacity-10"></div>

        <div className="relative px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header Section */}
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-slate-50 via-indigo-200 to-purple-200 bg-clip-text sm:text-4xl">
                      My Applied Tasks
                    </h1>
                    <p className="mt-2 text-slate-300">
                      Track your task applications and submit completed work
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="items-center hidden px-3 py-2 font-medium text-white transition-all duration-200 rounded-lg shadow-lg sm:inline-flex bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className={`w-4 h-4 mr-2 ${
                          isLoading ? "animate-spin" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </button>
                    <Link
                      to="/exploretask"
                      className="items-center hidden px-4 py-2 font-medium text-white transition-all duration-200 rounded-lg shadow-lg sm:inline-flex bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Explore More Tasks
                    </Link>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 p-1 bg-slate-800/50 rounded-xl backdrop-blur-sm">
                  {filterOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setActiveFilter(option.key)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        activeFilter === option.key
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {option.label}
                      {option.count > 0 && (
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            activeFilter === option.key
                              ? "bg-white/20 text-white"
                              : "bg-slate-600/50 text-slate-400"
                          }`}
                        >
                          {option.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Tasks Grid */}
            <ScrollRevealGroup>
              {filteredTasks.length === 0 ? (
                <ScrollReveal>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-16 text-center"
                  >
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                      <svg
                        className="w-12 h-12 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-slate-50">
                      {activeFilter === "all"
                        ? "No Applied Tasks Yet"
                        : `No ${
                            filterOptions.find((f) => f.key === activeFilter)
                              ?.label
                          } Tasks`}
                    </h3>
                    <p className="mb-6 text-slate-400">
                      {activeFilter === "all"
                        ? "Start by exploring and applying for tasks that match your skills."
                        : `You don't have any ${filterOptions
                            .find((f) => f.key === activeFilter)
                            ?.label.toLowerCase()} tasks at the moment.`}
                    </p>
                    <Link
                      to="/exploretask"
                      className="inline-flex items-center px-6 py-3 font-medium text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Explore Available Tasks
                    </Link>
                  </motion.div>
                </ScrollReveal>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredTasks.map((task, index) => {
                    // Skip null or undefined tasks
                    if (!task || !task.id) return null;

                    return (
                      <ScrollReveal key={task.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -4 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl group-hover:opacity-100 blur-xl"></div>
                          <div className="relative p-6 transition-all duration-300 border shadow-xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20 hover:shadow-2xl">
                            {/* Task Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="mb-1 text-lg font-semibold text-slate-50 line-clamp-1">
                                  {task.title || "Untitled Task"}
                                </h3>
                                <p className="mb-2 text-sm text-slate-400">
                                  {task.company || "Unknown Company"}
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                  <TaskStatusBadge
                                    status={task.status || "unknown"}
                                  />
                                  <span className="px-2 py-1 text-xs rounded-full text-slate-400 bg-slate-700/50">
                                    {task.difficulty || "Medium"}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-400">
                                  ${(task.price || 0).toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-400">
                                  Applied {formatDate(task.appliedAt)}
                                </div>
                              </div>
                            </div>

                            {/* Task Description */}
                            <p className="mb-4 text-sm text-slate-300 line-clamp-2">
                              {task.description || "No description available"}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-300">
                                  Progress
                                </span>
                                <span className="text-sm font-bold text-slate-50">
                                  {task.progress || 0}%
                                </span>
                              </div>
                              <div className="w-full h-2 overflow-hidden rounded-full bg-slate-700/50">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${task.progress || 0}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: index * 0.1,
                                  }}
                                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                                    task.progress || 0
                                  )}`}
                                />
                              </div>
                            </div>

                            {/* Deadline and Time Info */}
                            <div className="flex items-center justify-between mb-4 text-sm">
                              <div className="text-slate-400">
                                <span className="block">
                                  Deadline:{" "}
                                  {formatDate(task.deadline) || "No deadline"}
                                </span>
                                <span className="block">
                                  Time remaining:{" "}
                                  {task.timeRemaining || "Unknown"}
                                </span>
                              </div>
                              <div className="text-slate-400">
                                <span className="block">Last updated:</span>
                                <span className="block">
                                  {formatDate(task.lastUpdated) || "Never"}
                                </span>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {(task.skills || [])
                                .slice(0, 3)
                                .map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-1 text-xs text-indigo-200 rounded-full bg-indigo-500/20"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              {(task.skills || []).length > 3 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-slate-600/50 text-slate-400">
                                  +{(task.skills || []).length - 3} more
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <Link
                                to={`/task-details/${task.id}`}
                                className="flex-1 px-3 py-2 text-sm font-medium text-center transition-all duration-200 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white"
                              >
                                View Details
                              </Link>

                              {(task.status === "approved" ||
                                task.status === "accepted" ||
                                task.status === "in-progress") &&
                                !task.submittedAt && (
                                  <div className="flex-1">
                                    <label className="relative cursor-pointer">
                                      <input
                                        type="file"
                                        accept=".pdf,.docx,.doc"
                                        multiple
                                        onChange={(e) =>
                                          handleFileUpload(
                                            task.applicationId || task.id,
                                            Array.from(e.target.files)
                                          )
                                        }
                                        className="hidden"
                                        disabled={
                                          uploadingTaskId ===
                                          (task.applicationId || task.id)
                                        }
                                      />
                                      <div
                                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                                          uploadingTaskId ===
                                          (task.applicationId || task.id)
                                            ? "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
                                        }`}
                                      >
                                        {uploadingTaskId ===
                                        (task.applicationId || task.id) ? (
                                          <span className="flex items-center justify-center">
                                            <svg
                                              className="w-4 h-4 mr-1 animate-spin"
                                              viewBox="0 0 24 24"
                                            >
                                              <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                              ></circle>
                                              <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                              ></path>
                                            </svg>
                                            Uploading...
                                          </span>
                                        ) : (
                                          "Submit Work"
                                        )}
                                      </div>
                                    </label>
                                  </div>
                                )}

                              {task.submittedAt && (
                                <div className="flex-1 px-3 py-2 text-sm font-medium text-center text-purple-200 rounded-lg bg-purple-500/20">
                                  ✓ Submitted
                                </div>
                              )}
                            </div>

                            {/* Submission Info */}
                            {task.submittedAt && (
                              <div className="p-3 mt-3 border rounded-lg bg-purple-500/10 border-purple-500/20">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-purple-300">
                                      📎{" "}
                                      {task.submissionCount > 1
                                        ? `${task.submissionCount} files submitted`
                                        : task.submissionFile ||
                                          "File submitted"}
                                    </span>
                                    <span className="text-purple-400">
                                      {formatDate(task.submittedAt)}
                                    </span>
                                  </div>
                                  {task.submissions &&
                                    task.submissions.length > 1 && (
                                      <div className="text-xs text-purple-300">
                                        {task.submissions
                                          .slice(0, 3)
                                          .map((sub, idx) => (
                                            <div key={idx} className="truncate">
                                              • {sub.originalName}
                                            </div>
                                          ))}
                                        {task.submissions.length > 3 && (
                                          <div className="text-purple-400">
                                            +{task.submissions.length - 3} more
                                            files
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}
            </ScrollRevealGroup>

            {/* Quick Stats */}
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4"
              >
                {[
                  {
                    label: "Total Applied",
                    value: Array.isArray(appliedTasks)
                      ? appliedTasks.length
                      : 0,
                    color: "from-blue-500 to-indigo-500",
                  },
                  {
                    label: "In Progress",
                    value: Array.isArray(appliedTasks)
                      ? appliedTasks.filter(
                          (t) =>
                            t &&
                            (t.status === "in-progress" ||
                              t.status === "approved" ||
                              t.status === "accepted")
                        ).length
                      : 0,
                    color: "from-yellow-500 to-orange-500",
                  },
                  {
                    label: "Submitted",
                    value: Array.isArray(appliedTasks)
                      ? appliedTasks.filter(
                          (t) =>
                            t &&
                            (t.status === "submitted" ||
                              t.status === "completed")
                        ).length
                      : 0,
                    color: "from-purple-500 to-indigo-500",
                  },
                ].map((stat, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <div className="relative p-4 text-center border bg-white/10 backdrop-blur-xl rounded-xl border-white/20">
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppliedTasks;
