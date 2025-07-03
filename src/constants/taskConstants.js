/**
 * Task-related constants
 */

/**
 * Tab configuration for task filtering
 */
export const TAB_CONFIG = [
  {
    id: "all",
    label: "All Tasks",
    icon: "📋",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "open",
    label: "Open",
    icon: "🔓",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "approved",
    label: "Approved",
    icon: "✅",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "submitted",
    label: "Submitted",
    icon: "📤",
    color: "from-yellow-500 to-orange-600",
  },
];

/**
 * Statistics configuration for dashboard
 */
export const STAT_CONFIG = [
  {
    key: "total",
    name: "Total Tasks",
    icon: "📊",
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-500/20 to-indigo-600/20",
  },
  {
    key: "open",
    name: "Open Tasks",
    icon: "🔓",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/20 to-emerald-600/20",
  },
  {
    key: "approved",
    name: "Approved",
    icon: "✅",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/20 to-cyan-600/20",
  },
  {
    key: "submitted",
    name: "Submitted",
    icon: "📤",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-500/20 to-orange-600/20",
  },
];

/**
 * Mock developers data (in real app, this would come from API/context)
 * This will be replaced when backend integration is complete
 */
export const DEVELOPERS = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  { id: 4, name: "Alice Wilson", email: "alice@example.com" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com" },
];

/**
 * Task status options
 */
export const TASK_STATUS = {
  OPEN: "open",
  APPROVED: "approved",
  SUBMITTED: "submitted",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

/**
 * Task difficulty levels
 */
export const TASK_DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};
