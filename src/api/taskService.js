/**
 * Task API service
 * Frontend service for task-related API calls
 */

import enhancedTaskAPI from "./enhancedTaskAPI";

/**
 * Get all tasks with optional filters
 * Always uses response.data.tasks as the source of truth per backend contract
 */
export const getTasks = async (filters = {}) => {
  const token = localStorage.getItem("token");
  if (token) {
    enhancedTaskAPI.setToken(token);
  }

  try {
    const response = await enhancedTaskAPI.getTasks(filters);
    console.log("🔍 Raw API response:", response);

    // Backend contract: tasks are always in response.data.tasks
    if (response?.data?.tasks && Array.isArray(response.data.tasks)) {
      console.log(
        "✅ Tasks loaded from response.data.tasks:",
        response.data.tasks.length,
        "tasks"
      );
      return response.data.tasks;
    }

    // If the expected format is not found, log the issue and return empty array
    console.warn(
      "⚠️ Backend response does not contain data.tasks array:",
      response
    );
    return [];
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return [];
  }
};

/**
 * Get single task by ID
 */
export const getTaskById = async (taskId) => {
  const token = localStorage.getItem("token");
  if (token) {
    enhancedTaskAPI.setToken(token);
  }

  return await enhancedTaskAPI.getTaskById(taskId);
};

/**
 * Create new task
 */
export const createTask = async (_taskData) => {
  // This would need admin endpoint - using enhancedTaskAPI for consistency
  throw new Error("Task creation requires admin privileges");
};

/**
 * Update task
 */
export const updateTask = async (_taskId, _taskData) => {
  // This would need admin endpoint - using enhancedTaskAPI for consistency
  throw new Error("Task update requires admin privileges");
};

/**
 * Delete task
 */
export const deleteTask = async (_taskId) => {
  // This would need admin endpoint - using enhancedTaskAPI for consistency
  throw new Error("Task deletion requires admin privileges");
};

/**
 * Apply for task
 */
export const applyForTask = async (taskId, applicationData) => {
  const token = localStorage.getItem("token");
  if (token) {
    enhancedTaskAPI.setToken(token);
  }

  return await enhancedTaskAPI.applyForTask(
    taskId,
    applicationData?.message || ""
  );
};

/**
 * Get tasks by status
 */
export const getTasksByStatus = async (status) => {
  return getTasks({ status });
};

/**
 * Search tasks
 */
export const searchTasks = async (query) => {
  return getTasks({ search: query });
};
