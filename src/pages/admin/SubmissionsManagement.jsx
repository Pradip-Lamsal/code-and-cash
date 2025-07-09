import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../../api/adminService";

/**
 * Submissions Management Component
 *
 * Provides comprehensive submission management functionality including:
 * - View all submissions with pagination
 * - Filter by status, task, user
 * - Search submissions
 * - Download submission files
 * - Update submission status
 * - Leave feedback
 * - Approve/reject submissions
 */
const SubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [taskFilter, setTaskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [submissionToReview, setSubmissionToReview] = useState(null);
  const [bulkAction, setBulkAction] = useState("");

  const itemsPerPage = 10;

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(taskFilter !== "all" && { task: taskFilter }),
      };

      // Using GET /api/admin/task-applications endpoint (since submissions endpoint may not exist)
      const data = await adminService.getTaskApplications(
        currentPage,
        itemsPerPage,
        filters
      );

      // Handle different response formats from backend
      if (data?.data?.applications) {
        // Format: { data: { applications: [...], total: 100 } }
        setSubmissions(data.data.applications);
        setTotalPages(Math.ceil(data.data.total / itemsPerPage));
      } else if (data?.applications) {
        // Format: { applications: [...], total: 100 }
        setSubmissions(data.applications);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } else if (Array.isArray(data)) {
        // Format: [...] (direct array)
        setSubmissions(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } else {
        // No data or unknown format
        setSubmissions([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, taskFilter, searchTerm]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleDownloadFile = async (submissionId, _fileName) => {
    try {
      // Using GET /api/admin/submissions/:submissionId/download endpoint
      await adminService.downloadSubmission(submissionId);
    } catch (err) {
      setError(err.message);
      console.error("Error downloading file:", err);
    }
  };

  const handleUpdateStatus = async (submissionId, newStatus, feedback = "") => {
    try {
      // Using PATCH /api/admin/submissions/:submissionId/status endpoint
      await adminService.updateSubmissionStatus(
        submissionId,
        newStatus,
        feedback
      );
      setSubmissions(
        submissions.map((submission) =>
          submission.id === submissionId
            ? { ...submission, status: newStatus, feedback }
            : submission
        )
      );
      setShowFeedbackModal(false);
      setSubmissionToReview(null);
    } catch (err) {
      setError(err.message);
      console.error("Error updating submission status:", err);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedSubmissions.length === 0) return;

    try {
      for (const submissionId of selectedSubmissions) {
        if (bulkAction === "approve") {
          await adminService.updateSubmissionStatus(submissionId, "approved");
        } else if (bulkAction === "reject") {
          await adminService.updateSubmissionStatus(submissionId, "rejected");
        }
      }

      setSelectedSubmissions([]);
      setBulkAction("");
      fetchSubmissions();
    } catch (err) {
      setError(err.message);
      console.error("Error performing bulk action:", err);
    }
  };

  const toggleSubmissionSelection = (submissionId) => {
    setSelectedSubmissions((prev) =>
      prev.includes(submissionId)
        ? prev.filter((id) => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedSubmissions((prev) =>
      prev.length === submissions.length
        ? []
        : submissions.map((submission) => submission.id)
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
      "in-review": "bg-blue-500",
      "needs-revision": "bg-orange-500",
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full text-white ${
          statusColors[status] || statusColors.pending
        }`}
      >
        {status.replace("-", " ")}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Submissions Management
          </h1>
          <p className="text-gray-400">Review and manage task submissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Export Data
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="needs-revision">Needs Revision</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task
            </label>
            <select
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Tasks</option>
              {/* Task options would be populated from API */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Actions
            </label>
            <button
              onClick={fetchSubmissions}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-300">
              {selectedSubmissions.length} submission
              {selectedSubmissions.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex items-center space-x-3">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Action</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedSubmissions.length === submissions.length &&
                      submissions.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {submissions.map((submission) => (
                <motion.tr
                  key={submission.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.id)}
                      onChange={() => toggleSubmissionSelection(submission.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {submission.taskTitle}
                      </p>
                      <p className="text-gray-400 text-sm">
                        ID: {submission.taskId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-white">
                          {submission.userName?.[0] || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {submission.userName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {submission.userEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(submission.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {submission.files?.map((file, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleDownloadFile(submission.id, file.name)
                          }
                          className="block text-sm text-indigo-400 hover:text-indigo-300"
                        >
                          📁 {file.name}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(submission.submittedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSubmissionToReview(submission);
                          setShowFeedbackModal(true);
                        }}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        Review
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(submission.id, "approved")
                        }
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded-full hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(submission.id, "rejected")
                        }
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, submissions.length)} of{" "}
          {submissions.length} submissions
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && submissionToReview && (
        <FeedbackModal
          submission={submissionToReview}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleUpdateStatus}
        />
      )}
    </div>
  );
};

// Feedback Modal Component
const FeedbackModal = ({ submission, onClose, onSubmit }) => {
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(submission.id, status, feedback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-white mb-6">
          Review Submission
        </h3>

        <div className="mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">
              Task: {submission.taskTitle}
            </h4>
            <p className="text-gray-300 mb-2">
              Submitted by: {submission.userName}
            </p>
            <p className="text-gray-300 mb-4">
              Submitted on: {formatDate(submission.submittedAt)}
            </p>

            {submission.files && submission.files.length > 0 && (
              <div>
                <h5 className="text-white font-medium mb-2">Files:</h5>
                <div className="space-y-1">
                  {submission.files.map((file, index) => (
                    <button
                      key={index}
                      className="block text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      📁 {file.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="needs-revision">Needs Revision</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback
            </label>
            <textarea
              rows="6"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback for the submission..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionsManagement;
