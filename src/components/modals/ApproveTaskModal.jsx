import { motion } from "framer-motion";
import { useState } from "react";
import { DEVELOPERS, formatDate } from "../../utils/taskUtils.jsx";

/**
 * ApproveTaskModal component for approving tasks and assigning developers
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {Object} task - Task object to approve
 * @param {Function} onApproveTask - Function to approve the task
 */
export const ApproveTaskModal = ({ isOpen, onClose, task, onApproveTask }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [error, setError] = useState("");

  const handleApprove = () => {
    if (!selectedDeveloper) {
      setError("Please select a developer");
      return;
    }

    const developer = DEVELOPERS.find(
      (dev) => dev.id === parseInt(selectedDeveloper)
    );
    onApproveTask(task.id, {
      developerId: developer.id,
      developerName: developer.name,
      developerEmail: developer.email,
      approvedAt: new Date().toISOString(),
    });

    setSelectedDeveloper("");
    setError("");
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Approve Task</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
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
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600">Price: ${task.price}</p>
          <p className="text-sm text-gray-600">
            Deadline: {formatDate(task.deadline)}
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Assign to Developer *
          </label>
          <select
            value={selectedDeveloper}
            onChange={(e) => {
              setSelectedDeveloper(e.target.value);
              setError("");
            }}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a developer</option>
            {DEVELOPERS.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name} ({dev.email})
              </option>
            ))}
          </select>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          >
            Approve Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
