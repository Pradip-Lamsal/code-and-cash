import { apiClient as api } from "./baseService.jsx";

/**
 * Admin API Service
 *
 * This service handles all admin-related API calls including:
 * - User management (view, delete)
 * - Task management (view, create, delete)
 * - Submission monitoring (view, download, update status)
 * - Admin authentication and authorization
 */
export const adminService = {
  // Set token for API calls
  setToken: (token) => {
    api.setToken(token);
  },

  // Authentication
  checkAdminAccess: () => api.get("/api/admin/check-access"),

  // Dashboard
  getDashboardStats: () => api.get("/api/admin/stats"),

  // User Management
  getUsers: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return api.get(`/api/admin/users?${queryParams}`);
  },
  getUserById: (userId) => api.get(`/api/admin/users/${userId}`),
  deleteUser: (userId) => api.delete(`/api/admin/users/${userId}`),
  updateUserStatus: (userId, status) =>
    api.patch(`/api/admin/users/${userId}/status`, { status }),

  // Task Management
  getTasks: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return api.get(`/api/admin/tasks?${queryParams}`);
  },
  getTaskById: (taskId) => api.get(`/api/admin/tasks/${taskId}`),
  createTask: (taskData) => api.post("/api/admin/tasks", taskData),
  deleteTask: (taskId) => api.delete(`/api/admin/tasks/${taskId}`),
  updateTask: (taskId, taskData) =>
    api.put(`/api/admin/tasks/${taskId}`, taskData),

  // Application Management
  getTaskApplications: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return api.get(`/api/admin/task-applications?${queryParams}`);
  },
  getApplicationDetails: (userId, taskId) =>
    api.get(`/api/admin/applications/${userId}/${taskId}`),

  // Submission Management
  getAllSubmissions: (filters = {}, page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return api.get(`/api/admin/submissions?${queryParams}`);
  },
  getUserSubmissions: (userId) =>
    api.get(`/api/admin/user-submissions/${userId}`),
  getSubmissionById: (submissionId) =>
    api.get(`/api/admin/submissions/${submissionId}`),
  downloadSubmission: (submissionId) =>
    api.get(`/api/admin/submissions/${submissionId}/download`, {
      responseType: "blob",
    }),
  updateSubmissionStatus: (submissionId, status, feedback) =>
    api.patch(`/api/admin/submissions/${submissionId}/status`, {
      status,
      feedback,
    }),
};

export default adminService;
