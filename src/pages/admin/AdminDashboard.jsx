import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Plus,
  Send,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService } from "../../api/adminService";

/**
 * Enhanced Admin Dashboard Component
 * Modern, responsive design with glassmorphism effects
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    openTasks: 0,
    completedTasks: 0,
    recentUsers: 0,
    recentTasks: 0,
    totalApplications: 0,
    pendingReviews: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
  });
  const [analytics, setAnalytics] = useState({
    period: "30d",
    userRegistrations: [],
    taskCreations: [],
    applicationStats: [],
    categoryStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both stats and analytics
      const [statsData, analyticsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAnalytics("30d"),
      ]);

      setStats(statsData);
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      link: "/admin/users",
      trend: {
        value: stats.recentUsers,
        label: "new this month",
        positive: true,
      },
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: FileText,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      link: "/admin/tasks",
      trend: {
        value: stats.recentTasks,
        label: "new this month",
        positive: true,
      },
    },
    {
      title: "Open Tasks",
      value: stats.openTasks,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      link: "/admin/tasks?status=open",
      trend: { value: "Available", label: "for applications", positive: true },
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle,
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/20 to-purple-500/20",
      link: "/admin/tasks?status=completed",
      trend: { value: "Successfully", label: "finished", positive: true },
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: Send,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      link: "/admin/applications",
      trend: { value: "All", label: "submissions", positive: true },
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: AlertCircle,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-500/20 to-rose-500/20",
      link: "/admin/applications?status=pending",
      trend: { value: "Awaiting", label: "review", positive: false },
    },
    {
      title: "Approved",
      value: stats.approvedSubmissions,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-500/20 to-green-500/20",
      link: "/admin/applications?status=accepted",
      trend: { value: "Accepted", label: "applications", positive: true },
    },
    {
      title: "Rejected",
      value: stats.rejectedSubmissions,
      icon: AlertCircle,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      link: "/admin/applications?status=rejected",
      trend: { value: "Declined", label: "applications", positive: false },
    },
  ];

  const quickActions = [
    {
      title: "Create New Task",
      description: "Add a new task to the platform",
      icon: Plus,
      gradient: "from-blue-600 to-indigo-600",
      link: "/admin/tasks/create",
    },
    {
      title: "Review Applications",
      description: "Review pending task applications",
      icon: Eye,
      gradient: "from-green-600 to-emerald-600",
      link: "/admin/applications?status=pending",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: UserCheck,
      gradient: "from-purple-600 to-pink-600",
      link: "/admin/users",
    },
    {
      title: "Activity Logs",
      description: "View platform activity and admin logs",
      icon: BarChart3,
      gradient: "from-orange-600 to-red-600",
      link: "/admin/activity-logs",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin border-t-indigo-600"></div>
            <div
              className="absolute inset-2 border-4 border-gray-200 rounded-full animate-spin border-t-purple-600"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
          <p className="text-gray-300 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-400">
              Error Loading Dashboard
            </h2>
          </div>
          <p className="text-red-300 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Monitor and manage your platform</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last updated</span>
          </div>
          <p className="text-white font-medium">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.bgGradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
              ></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {card.link && (
                    <Link
                      to={card.link}
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-400 text-sm font-medium">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold text-white">{card.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {card.trend.positive ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-orange-400" />
                    )}
                    <span
                      className={
                        card.trend.positive
                          ? "text-green-400"
                          : "text-orange-400"
                      }
                    >
                      {card.trend.value}
                    </span>
                    <span className="text-gray-500">{card.trend.label}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="group"
            >
              <Link
                to={action.link}
                className="block relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group-hover:bg-gray-800/50"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Metrics */}
        <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Platform Overview
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Application Success Rate</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalApplications > 0
                          ? (stats.approvedSubmissions /
                              stats.totalApplications) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-white font-medium min-w-[3rem]">
                  {stats.totalApplications > 0
                    ? Math.round(
                        (stats.approvedSubmissions / stats.totalApplications) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Task Completion Rate</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalTasks > 0
                          ? (stats.completedTasks / stats.totalTasks) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-white font-medium min-w-[3rem]">
                  {stats.totalTasks > 0
                    ? Math.round(
                        (stats.completedTasks / stats.totalTasks) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Open Task Ratio</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalTasks > 0
                          ? (stats.openTasks / stats.totalTasks) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-white font-medium min-w-[3rem]">
                  {stats.totalTasks > 0
                    ? Math.round((stats.openTasks / stats.totalTasks) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Categories
          </h3>
          <div className="space-y-4">
            {(
              analytics.categoryStats || [
                { _id: "frontend", count: 45, avgPayout: 250 },
                { _id: "backend", count: 32, avgPayout: 300 },
                { _id: "fullstack", count: 28, avgPayout: 400 },
                { _id: "mobile", count: 18, avgPayout: 350 },
                { _id: "design", count: 12, avgPayout: 200 },
              ]
            )
              .slice(0, 5)
              .map((category, index) => {
                const maxCount = Math.max(
                  ...(analytics.categoryStats?.map((c) => c.count) || [50])
                );
                const percentage = (category.count / maxCount) * 100;
                const colors = [
                  "from-blue-500 to-indigo-500",
                  "from-green-500 to-emerald-500",
                  "from-purple-500 to-pink-500",
                  "from-yellow-500 to-orange-500",
                  "from-red-500 to-rose-500",
                ];

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                          colors[index % colors.length]
                        }`}
                      ></div>
                      <span className="text-white text-sm capitalize font-medium">
                        {category._id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">
                        {category.count} tasks
                      </span>
                      <div className="w-16 bg-gray-800 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${
                            colors[index % colors.length]
                          } h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New user registered",
              user: "john.doe@example.com",
              time: "2 minutes ago",
              type: "user",
            },
            {
              action: "Task submitted",
              user: "jane.smith@example.com",
              time: "5 minutes ago",
              type: "task",
            },
            {
              action: "Payment processed",
              user: "System",
              time: "10 minutes ago",
              type: "payment",
            },
            {
              action: "New task created",
              user: "admin@example.com",
              time: "15 minutes ago",
              type: "task",
            },
            {
              action: "User profile updated",
              user: "bob.wilson@example.com",
              time: "20 minutes ago",
              type: "user",
            },
          ].map((activity, index) => {
            const getIcon = (type) => {
              switch (type) {
                case "user":
                  return <Users className="w-4 h-4" />;
                case "task":
                  return <FileText className="w-4 h-4" />;
                case "payment":
                  return <DollarSign className="w-4 h-4" />;
                default:
                  return <Activity className="w-4 h-4" />;
              }
            };

            const getColor = (type) => {
              switch (type) {
                case "user":
                  return "from-blue-500 to-indigo-500";
                case "task":
                  return "from-green-500 to-emerald-500";
                case "payment":
                  return "from-yellow-500 to-orange-500";
                default:
                  return "from-gray-500 to-gray-600";
              }
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getColor(
                      activity.type
                    )} flex items-center justify-center`}
                  >
                    {getIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.user}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
