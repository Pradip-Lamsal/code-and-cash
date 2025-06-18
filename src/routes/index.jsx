import { lazy, Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

// Lazy load components
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Exploretask = lazy(() => import("../pages/Exploretask"));
const TaskDetails = lazy(() => import("../pages/TaskDetails"));
const Applytask = lazy(() => import("../pages/Applytask"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Landing and Main Pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/Dashboard"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signup" element={<Navigate to="/signup" replace />} />

        {/* Task Related Routes */}
        <Route path="/explore" element={<Exploretask />} />
        <Route path="/Explore" element={<Navigate to="/explore" replace />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/Task/:id" element={<Navigate to="/task/:id" replace />} />
        <Route path="/apply/:id/success" element={<Applytask />} />
        <Route
          path="/Apply/:id/success"
          element={<Navigate to="/apply/:id/success" replace />}
        />

        {/* Static Pages */}
        <Route
          path="/developers"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center p-8">
                <h1 className="text-2xl font-bold mb-4">
                  Coming Soon: Developers Page
                </h1>
                <Link to="/" className="text-blue-600 hover:text-blue-700">
                  Return to Home
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/business"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center p-8">
                <h1 className="text-2xl font-bold mb-4">
                  Coming Soon: Business Page
                </h1>
                <Link to="/" className="text-blue-600 hover:text-blue-700">
                  Return to Home
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/help"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center p-8">
                <h1 className="text-2xl font-bold mb-4">
                  Coming Soon: Help Center
                </h1>
                <Link to="/" className="text-blue-600 hover:text-blue-700">
                  Return to Home
                </Link>
              </div>
            </div>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
