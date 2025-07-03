/**
 * Task API service
 * Frontend service for task-related API calls
 */

import { API_ENDPOINTS } from "../constants/appConstants";
import { apiClient, apiWrapper } from "./baseService";

/**
 * Get all tasks with optional filters
 */
export const getTasks = async (filters = {}) => {
  return apiWrapper(async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams
      ? `${API_ENDPOINTS.TASKS.LIST}?${queryParams}`
      : API_ENDPOINTS.TASKS.LIST;
    return await apiClient.get(endpoint);
  });
};

/**
 * Get single task by ID
 */
export const getTaskById = async (taskId) => {
  return apiWrapper(async () => {
    const endpoint = API_ENDPOINTS.TASKS.UPDATE.replace(":id", taskId);
    return await apiClient.get(endpoint);
  });
};

/**
 * Create new task
 */
export const createTask = async (taskData) => {
  return apiWrapper(async () => {
    return await apiClient.post(API_ENDPOINTS.TASKS.CREATE, taskData);
  });
};

/**
 * Update task
 */
export const updateTask = async (taskId, taskData) => {
  return apiWrapper(async () => {
    const endpoint = API_ENDPOINTS.TASKS.UPDATE.replace(":id", taskId);
    return await apiClient.put(endpoint, taskData);
  });
};

/**
 * Delete task
 */
export const deleteTask = async (taskId) => {
  return apiWrapper(async () => {
    const endpoint = API_ENDPOINTS.TASKS.DELETE.replace(":id", taskId);
    return await apiClient.delete(endpoint);
  });
};

/**
 * Apply for task
 */
export const applyForTask = async (taskId, applicationData) => {
  return apiWrapper(async () => {
    const endpoint = API_ENDPOINTS.TASKS.APPLY.replace(":id", taskId);
    return await apiClient.post(endpoint, applicationData);
  });
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
