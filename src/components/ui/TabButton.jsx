import { motion } from "framer-motion";

/**
 * Reusable TabButton component for tab navigation
 * @param {Object} tab - Tab configuration object
 * @param {boolean} isActive - Whether this tab is currently active
 * @param {Function} onClick - Click handler function
 * @param {number} count - Optional count to display
 */
export const TabButton = ({ tab, isActive, onClick, count }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
        : "text-gray-400 hover:text-white hover:bg-white/10"
    }`}
  >
    <div className="flex items-center space-x-2">
      <span className="text-lg">{tab.icon}</span>
      <span>{tab.label}</span>
      {count !== undefined && (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            isActive ? "bg-white/20" : "bg-gray-700"
          }`}
        >
          {count}
        </span>
      )}
    </div>
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5"
      />
    )}
  </motion.button>
);
