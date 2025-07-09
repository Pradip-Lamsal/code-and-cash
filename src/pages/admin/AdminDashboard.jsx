import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService } from "../../api/adminService";

/**
 * Admin Dashboard Component
 *
 * Main dashboard showing admin statistics and quick actions
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalSubmissions: 0,
    pendingReviews: 0,
    activeUsers: 0,
    completedTasks: 0,
    revenue: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using GET /api/admin/stats endpoint
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "bg-blue-500",
      link: "/admin/users",
      trend: "+12% from last month",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: "📋",
      color: "bg-green-500",
      link: "/admin/tasks",
      trend: "+8% from last month",
    },
    {
      title: "Active Submissions",
      value: stats.totalSubmissions,
      icon: "📤",
      color: "bg-yellow-500",
      link: "/admin/submissions",
      trend: "+23% from last month",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: "⏳",
      color: "bg-red-500",
      link: "/admin/submissions?status=pending",
      trend: "5 new today",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: "🟢",
      color: "bg-purple-500",
      link: "/admin/users?status=active",
      trend: "+5% from last week",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: "✅",
      color: "bg-indigo-500",
      link: "/admin/tasks?status=completed",
      trend: "+15% from last month",
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: "💰",
      color: "bg-emerald-500",
      link: "/admin/revenue",
      trend: "+18% from last month",
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: "📊",
      color: "bg-orange-500",
      link: "/admin/analytics",
      trend: "+2.3% from last month",
    },
  ];

  const quickActions = [
    {
      title: "Create New Task",
      description: "Add a new task to the platform",
      icon: "➕",
      color: "bg-blue-600",
      link: "/admin/tasks/create",
    },
    {
      title: "Review Submissions",
      description: "Review pending task submissions",
      icon: "👁️",
      color: "bg-green-600",
      link: "/admin/submissions?status=pending",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: "👤",
      color: "bg-purple-600",
      link: "/admin/users",
    },
    {
      title: "Analytics",
      description: "View platform analytics and reports",
      icon: "📈",
      color: "bg-orange-600",
      link: "/admin/analytics",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-900/20 border border-red-500 rounded-lg">
        <h2 className="text-xl font-bold text-red-400 mb-2">
          Error Loading Dashboard
        </h2>
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={fetchDashboardStats}
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
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Monitor and manage your platform</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last updated</p>
          <p className="text-white">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>
              {card.link && (
                <Link
                  to={card.link}
                  className="text-gray-400 hover:text-white transition-colors"
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
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-gray-400 text-sm font-medium">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-green-400">{card.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <Link
              to={action.link}
              className="block p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            {
              action: "New user registered",
              user: "john.doe@example.com",
              time: "2 minutes ago",
            },
            {
              action: "Task submitted",
              user: "jane.smith@example.com",
              time: "5 minutes ago",
            },
            {
              action: "Payment processed",
              user: "System",
              time: "10 minutes ago",
            },
            {
              action: "New task created",
              user: "admin@example.com",
              time: "15 minutes ago",
            },
            {
              action: "User profile updated",
              user: "bob.wilson@example.com",
              time: "20 minutes ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
            >
              <div>
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.user}</p>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
