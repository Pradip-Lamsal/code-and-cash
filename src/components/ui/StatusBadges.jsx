/**
 * Status Badge Component
 *
 * Displays status with appropriate colors
 */
export const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    const styles = {
      // User status styles
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      suspended:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",

      // Task status styles
      open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      closed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",

      // Submission status styles
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",

      // Default
      default: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };

    return styles[status?.toLowerCase()] || styles.default;
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle()}`}
    >
      {status}
    </span>
  );
};

/**
 * Difficulty Badge Component
 */
export const DifficultyBadge = ({ difficulty }) => {
  const getDifficultyStyle = () => {
    const styles = {
      easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      expert:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };

    return styles[difficulty?.toLowerCase()] || styles.medium;
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyStyle()}`}
    >
      {difficulty}
    </span>
  );
};

/**
 * Priority Badge Component
 */
export const PriorityBadge = ({ priority }) => {
  const getPriorityStyle = () => {
    const styles = {
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return styles[priority?.toLowerCase()] || styles.medium;
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle()}`}
    >
      {priority}
    </span>
  );
};
