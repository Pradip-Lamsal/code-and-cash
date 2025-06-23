import { lazy, Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

// Lazy load components
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Exploretask = lazy(() => import("../pages/Exploretask"));
const TaskDetails = lazy(() => import("../pages/TaskDetails"));
const Applytask = lazy(() => import("../pages/Applytask"));
const Profile = lazy(() => import("../pages/profile"));
const TaskManagement = lazy(() => import("../pages/admin/TaskManagement"));
const ColorPalette = lazy(() => import("../components/ColorPalette"));

// Placeholder page for routes that don't have implementations yet
const PlaceholderPage = () => (
  <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
    <div className="bg-indigo-900 backdrop-blur-sm p-8 rounded-lg shadow-lg shadow-indigo-900/50 max-w-md">
      <h1 className="text-3xl font-bold text-slate-50 mb-4">Coming Soon</h1>
      <p className="text-slate-300 mb-6">
        This page is under development and will be available soon.
      </p>
      <Link
        to="/dashboard"
        className="bg-indigo-600 text-slate-50 px-4 py-2 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 inline-block"
      >
        Return to Dashboard
      </Link>
    </div>
  </div>
);

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-indigo-950">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
      <p className="mt-4 text-slate-300">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Landing and Auth Pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Handle case-insensitive routes for auth */}
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="/Signup" element={<Navigate to="/signup" replace />} />

        {/* Main Application Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/Dashboard"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Profile" element={<Navigate to="/profile" replace />} />

        {/* Task Related Routes */}
        <Route path="/exploretask" element={<Exploretask />} />
        <Route
          path="/Exploretask"
          element={<Navigate to="/exploretask" replace />}
        />
        <Route path="/task-details/:id" element={<TaskDetails />} />
        <Route
          path="/Task-details/:id"
          element={<Navigate to="/task-details/:id" replace />}
        />
        <Route path="/applytask" element={<Applytask />} />
        <Route path="/applytask/:id" element={<Applytask />} />
        <Route
          path="/Applytask"
          element={<Navigate to="/applytask" replace />}
        />

        {/* Admin Routes */}
        <Route path="/admin/task-management" element={<TaskManagement />} />
        <Route
          path="/Admin/Task-management"
          element={<Navigate to="/admin/task-management" replace />}
        />

        {/* Color Palette - Dev Tool */}
        <Route path="/colors" element={<ColorPalette />} />

        {/* Placeholder routes for incomplete pages */}
        <Route path="/developers" element={<PlaceholderPage />} />
        <Route path="/business" element={<PlaceholderPage />} />
        <Route path="/help" element={<PlaceholderPage />} />

        {/* Catch all - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
