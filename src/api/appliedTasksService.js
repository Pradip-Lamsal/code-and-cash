/**
 * Applied Tasks API Service
 * Integration with backend endpoints for MyAppliedTasks functionality
 */

import { STORAGE_KEYS } from "../constants/appConstants.js";

// Backend API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

/**
 * Enhanced Task API Client for Applied Tasks
 */
class AppliedTasksAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
    this.token = null;
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
  }

  /**
   * Get authentication headers
   */
  getAuthHeaders() {
    const token = this.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Get authentication headers for file upload
   */
  getFileUploadHeaders() {
    const token = this.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
    return {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Don't set Content-Type for FormData, let browser set it
    };
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  /**
   * Get user's applied tasks
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Applied tasks data
   */
  async getMyAppliedTasks(options = {}) {
    const queryParams = new URLSearchParams({
      status: options.status || "all",
      limit: options.limit || 10,
      page: options.page || 1,
      ...options,
    }).toString();

    const response = await fetch(
      `${this.baseURL}/applications/my?${queryParams}`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Get application statistics
   * @returns {Promise<Object>} Application statistics
   */
  async getApplicationStats() {
    const response = await fetch(`${this.baseURL}/applications/my/stats`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get application details
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} Application details
   */
  async getApplicationDetails(applicationId) {
    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}`,
      {
        method: "GET",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Apply to a task
   * @param {string} taskId - Task ID
   * @param {string} message - Application message (optional)
   * @returns {Promise<Object>} Application result
   */
  async applyToTask(taskId, message = "") {
    const response = await fetch(
      `${this.baseURL}/applications/apply/${taskId}`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ message }),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Submit files for an application
   * @param {string} applicationId - Application ID
   * @param {File[]} files - Array of files to upload
   * @returns {Promise<Object>} Upload result
   */
  async submitFiles(applicationId, files) {
    if (!files || files.length === 0) {
      throw new Error("No files provided");
    }

    // Validate file types
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          `Invalid file type: ${file.name}. Only PDF and DOCX files are allowed.`
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        throw new Error(`File too large: ${file.name}. Maximum size is 10MB.`);
      }
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}/submit`,
      {
        method: "POST",
        headers: this.getFileUploadHeaders(),
        body: formData,
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Update application progress
   * @param {string} applicationId - Application ID
   * @param {number} progress - Progress percentage (0-100)
   * @returns {Promise<Object>} Update result
   */
  async updateProgress(applicationId, progress) {
    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}/progress`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ progress }),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Withdraw an application
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} Withdrawal result
   */
  async withdrawApplication(applicationId) {
    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}/withdraw`,
      {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Delete a submitted file
   * @param {string} applicationId - Application ID
   * @param {string} submissionId - Submission ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteSubmissionFile(applicationId, submissionId) {
    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}/submissions/${submissionId}`,
      {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  /**
   * Transform backend data to frontend format
   * @param {Object} application - Backend application data
   * @returns {Object} Frontend-formatted task data
   */
  transformApplicationData(application) {
    return {
      id: application._id,
      applicationId: application._id,
      title: application.task?.title || "Unknown Task",
      description: application.task?.description || "",
      price: application.task?.budget || 0,
      deadline: application.task?.deadline,
      status: this.mapStatus(application.status),
      appliedAt: application.appliedAt,
      skills: application.task?.skills || [],
      company: application.task?.company || "Unknown Company",
      difficulty: application.task?.difficulty || "Medium",
      progress: application.progress || 0,
      lastUpdated: application.updatedAt || application.appliedAt,
      timeRemaining: this.calculateTimeRemaining(application.task?.deadline),
      submissionFile: application.submissions?.[0]?.originalName || null,
      submittedAt: application.submissions?.[0]?.uploadedAt || null,
      submissionCount: application.submissions?.length || 0,
      submissions: application.submissions || [],
      expectedDelivery: application.expectedDelivery,
      paymentStatus: application.paymentStatus || "pending",
    };
  }

  /**
   * Map backend status to frontend status
   * @param {string} backendStatus - Backend status
   * @returns {string} Frontend status
   */
  mapStatus(backendStatus) {
    const statusMap = {
      pending: "applied",
      accepted: "approved",
      "in-progress": "in-progress",
      completed: "submitted",
      rejected: "rejected",
      cancelled: "cancelled",
    };
    return statusMap[backendStatus] || backendStatus;
  }

  /**
   * Calculate time remaining for a deadline
   * @param {string} deadline - Deadline date
   * @returns {string} Time remaining description
   */
  calculateTimeRemaining(deadline) {
    if (!deadline) return "No deadline";

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;

    if (diffTime <= 0) return "Overdue";

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day";
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  }
}

// Create and export singleton instance
export const appliedTasksAPI = new AppliedTasksAPI();

// Backward compatibility exports
export const getMyAppliedTasks = (options) =>
  appliedTasksAPI.getMyAppliedTasks(options);
export const submitFiles = (applicationId, files) =>
  appliedTasksAPI.submitFiles(applicationId, files);
export const updateProgress = (applicationId, progress) =>
  appliedTasksAPI.updateProgress(applicationId, progress);
export const withdrawApplication = (applicationId) =>
  appliedTasksAPI.withdrawApplication(applicationId);
