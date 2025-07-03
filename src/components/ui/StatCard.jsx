import { motion } from "framer-motion";

/**
 * Reusable StatCard component for displaying statistics
 * @param {Object} stat - Stat configuration object
 * @param {number|string} value - The value to display
 * @param {number} index - Index for stagger animation
 */
export const StatCard = ({ stat, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`relative overflow-hidden p-6 rounded-2xl shadow-xl bg-gradient-to-br ${stat.bgGradient} backdrop-blur border border-white/10 hover:border-white/20 transition-all`}
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center mb-2">
          <span className="mr-2 text-2xl">{stat.icon}</span>
          <h3 className="text-sm font-medium tracking-wide text-gray-300 uppercase">
            {stat.name}
          </h3>
        </div>
        <p
          className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
        >
          {value}
        </p>
      </div>
    </div>
    <div
      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-10 rounded-2xl`}
    ></div>
  </motion.div>
);
