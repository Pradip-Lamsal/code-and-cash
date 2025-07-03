/**
 * Reusable TaskStatusBadge component for displaying task status
 * @param {string} status - The status to display
 */
export const TaskStatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    const styles = {
      open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      approved: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      submitted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      completed: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return styles[status.toLowerCase()] || styles.open;
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};
