import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Clock,
  FileText,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService } from "../../api/adminService";

/**
 * Admin Dashboard Component
 *
 * A clean, simplified dashboard that strictly follows the API endpoints
 * and provides essential admin functionality without redundant UI elements.
 */
const AdminDashboard = () => {
  // Dashboard state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    openTasks: 0,
    completedTasks: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  // Load dashboard statistics and analytics data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API endpoint: GET /api/admin/stats
      const statsData = await adminService.getDashboardStats();
      setStats(statsData);

      // API endpoint: GET /api/admin/analytics?period=30d
      const analyticsData = await adminService.getAnalytics(selectedPeriod);
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dashboard stat cards
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/users",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0,
      icon: FileText,
      color: "bg-green-500",
      link: "/admin/tasks",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApplications || 0,
      icon: Clock,
      color: "bg-amber-500",
      link: "/admin/applications?status=pending",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks || 0,
      icon: UserCheck,
      color: "bg-indigo-500",
      link: "/admin/tasks?status=completed",
    },
  ];

  // Main admin actions
  const adminActions = [
    {
      title: "User Management",
      description: "View, edit, and manage user accounts",
      icon: Users,
      color: "bg-blue-600",
      link: "/admin/users",
      endpoint: "/api/admin/users",
    },
    {
      title: "Task Management",
      description: "Create, edit, and delete tasks",
      icon: FileText,
      color: "bg-green-600",
      link: "/admin/tasks",
      endpoint: "/api/admin/tasks",
    },
    {
      title: "Application Review",
      description: "Review and process task applications",
      icon: TrendingUp,
      color: "bg-amber-600",
      link: "/admin/applications",
      endpoint: "/api/admin/applications",
    },
    {
      title: "Activity Logs",
      description: "Track system activity",
      icon: Activity,
      color: "bg-purple-600",
      link: "/admin/activity-logs",
      endpoint: "/api/admin/activity-logs",
    },
  ];

  // Period options for analytics
  const periodOptions = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-6 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-red-400">Error</h2>
        </div>
        <p className="text-gray-300 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Platform overview and management</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="block p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {stat.value.toLocaleString()}
                  </h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Analytics Period Selector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Analytics</h2>
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedPeriod === option.value
                    ? "bg-indigo-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="h-64 flex items-center justify-center">
            {analytics ? (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Platform Activity
                    </h3>
                    <p className="text-sm text-gray-400">
                      User and task activity over time
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-400">Users</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-400">Tasks</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-xs text-gray-400">
                        Applications
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-40 w-full bg-gradient-to-b from-indigo-500/10 to-transparent rounded-lg relative">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gray-500 to-transparent"></div>
                  <BarChart3 className="w-8 h-8 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
                  <div className="text-center text-sm text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Analytics visualization would appear here
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No analytics data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Admin Functions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={action.link}
                className="flex items-start p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 mt-1">{action.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    API: {action.endpoint}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">System Status</h2>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-400 text-sm">API Connected</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-gray-400">Backend API</div>
            <div className="text-white font-medium">http://localhost:5001</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-gray-400">Last Updated</div>
            <div className="text-white font-medium">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
