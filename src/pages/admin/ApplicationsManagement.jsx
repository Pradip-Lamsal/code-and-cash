import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../../api/adminService";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import Loading from "../../components/ui/Loading";
import Pagination from "../../components/ui/Pagination";

/**
 * Applications Management Component
 *
 * Features:
 * - View all task applications
 * - Filter by status, user, task
 * - Bulk status updates
 * - Application details view
 * - File download functionality
 * - Status management (pending, approved, rejected)
 */
const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [bulkStatusUpdate, setBulkStatusUpdate] = useState({
    status: "",
    feedback: "",
  });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const itemsPerPage = 10;

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        sort: sortField,
        order: sortOrder,
      };

      const response = await adminService.getApplications(
        currentPage,
        itemsPerPage,
        filters
      );

      setApplications(response.applications || []);
      setTotalPages(response.totalPages || 1);
      setTotalApplications(response.total || 0);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusUpdate = async (applicationId, status, feedback = "") => {
    try {
      await adminService.updateApplicationStatus(
        applicationId,
        status,
        feedback
      );
      fetchApplications();
    } catch (err) {
      console.error("Error updating application status:", err);
    }
  };

  const handleBulkStatusUpdate = async () => {
    try {
      await adminService.bulkUpdateApplications(
        selectedApplications,
        bulkStatusUpdate.status,
        bulkStatusUpdate.feedback
      );
      setSelectedApplications([]);
      setBulkStatusUpdate({ status: "", feedback: "" });
      setShowStatusModal(false);
      fetchApplications();
    } catch (err) {
      console.error("Error updating applications:", err);
    }
  };

  const handleApplicationSelect = (applicationId) => {
    setSelectedApplications((prev) =>
      prev.includes(applicationId)
        ? prev.filter((id) => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(applications.map((app) => app._id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500";
      case "in_review":
        return "bg-blue-500/20 text-blue-400 border-blue-500";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  const viewApplicationDetails = async (applicationId) => {
    try {
      const details = await adminService.getApplicationDetails(applicationId);
      setSelectedApplication(details);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error fetching application details:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-900/20 border border-red-500 rounded-lg">
        <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Applications Management
          </h1>
          <p className="text-gray-400">
            Manage task applications and review submissions
          </p>
        </div>
        <div className="text-sm text-gray-400">
          Total: {totalApplications} applications
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applications..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Sort By
            </label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Last Updated</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 font-medium">
              {selectedApplications.length} application(s) selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
              <button
                onClick={() => setSelectedApplications([])}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedApplications.length === applications.length
                    }
                    onChange={handleSelectAll}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">
                  User
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">
                  Task
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">
                  Status
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">
                  Applied
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {applications.map((application) => (
                  <motion.tr
                    key={application._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application._id)}
                        onChange={() =>
                          handleApplicationSelect(application._id)
                        }
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {application.user?.email
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {application.user?.email || "Unknown User"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {application.user?.name || "No name"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">
                          {application.task?.title || "Unknown Task"}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {application.task?.company || "Unknown Company"}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-400 text-sm">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            viewApplicationDetails(application._id)
                          }
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View
                        </button>
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusUpdate(application._id, e.target.value)
                          }
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_review">In Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Bulk Status Update Modal */}
      <ConfirmationModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleBulkStatusUpdate}
        title="Update Application Status"
        message={
          <div className="space-y-4">
            <p>
              Update status for {selectedApplications.length} selected
              applications?
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                New Status
              </label>
              <select
                value={bulkStatusUpdate.status}
                onChange={(e) =>
                  setBulkStatusUpdate((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Feedback (Optional)
              </label>
              <textarea
                value={bulkStatusUpdate.feedback}
                onChange={(e) =>
                  setBulkStatusUpdate((prev) => ({
                    ...prev,
                    feedback: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                placeholder="Provide feedback for this status update..."
              />
            </div>
          </div>
        }
        confirmText="Update Status"
        cancelText="Cancel"
      />

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            showDetailsModal ? "block" : "hidden"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetailsModal(false)}
          />
          <div className="relative bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Application Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  User Information
                </h3>
                <p className="text-gray-300">
                  Email: {selectedApplication.user?.email}
                </p>
                <p className="text-gray-300">
                  Name: {selectedApplication.user?.name || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Task Information
                </h3>
                <p className="text-gray-300">
                  Title: {selectedApplication.task?.title}
                </p>
                <p className="text-gray-300">
                  Company: {selectedApplication.task?.company}
                </p>
                <p className="text-gray-300">
                  Category: {selectedApplication.task?.category}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Application Status
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    selectedApplication.status
                  )}`}
                >
                  {selectedApplication.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Application Date
                </h3>
                <p className="text-gray-300">
                  {new Date(selectedApplication.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedApplication.feedback && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Feedback
                  </h3>
                  <p className="text-gray-300">
                    {selectedApplication.feedback}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;
