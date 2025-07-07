import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedCubes from "../components/AnimatedCubes";

// Profile Completion Reminder Component
const ProfileCompletionReminder = ({ onClose }) => {
  // Mock profile completion percentage - in a real implementation, you would
  // calculate this based on user data from an API or local storage
  const completionPercentage = 30;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div className="w-full max-w-4xl p-4 mx-4 mt-4 overflow-hidden rounded-lg shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 space-x-4 sm:mb-0">
            <div className="relative p-2 bg-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div className="absolute w-4 h-4 bg-yellow-400 border-2 border-indigo-600 rounded-full -top-1 -right-1 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Complete Your Profile
              </h3>
              <div className="space-y-1">
                <p className="text-indigo-100">
                  Add your details to get personalized tasks and increase your
                  chances of being selected!
                </p>
                <div className="w-full bg-indigo-800/50 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-indigo-200">
                  {completionPercentage}% Complete
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center ml-10 space-x-3 sm:ml-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 font-medium text-white rounded-md bg-white/20 hover:bg-white/30"
              onClick={onClose}
            >
              Later
            </motion.button>
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 font-medium text-indigo-700 bg-white rounded-md hover:bg-indigo-50"
              >
                Complete Now
              </motion.button>
            </Link>
            <button
              onClick={onClose}
              className="p-1 text-white rounded-full hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Dashboard = () => {
  // References for sections to track when they come into view
  const howItWorksRef = useRef(null);
  const featuredTasksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // State for profile completion reminder
  const [showProfileReminder, setShowProfileReminder] = useState(false);

  // State for tracking whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for personalized recommendations
  const [personalizedTasks, setPersonalizedTasks] = useState([]);

  // Check if we should show the profile reminder on component mount
  useEffect(() => {
    const shouldShowReminder =
      localStorage.getItem("showProfileReminder") === "true";

    if (shouldShowReminder) {
      setShowProfileReminder(true);
    }
  }, []);

  // Function to close the reminder and not show it again
  const handleCloseReminder = () => {
    setShowProfileReminder(false);
    localStorage.removeItem("showProfileReminder");
  };

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Mock personalized tasks - in a real implementation, you would fetch these from an API
      const mockPersonalizedTasks = [
        {
          tag: "React + Tailwind",
          rate: "$95",
          title: "Dashboard UI Enhancement",
          difficulty: "Intermediate",
          matchPercentage: 98,
          description:
            "Improve an existing dashboard UI with modern components and animations...",
        },
        {
          tag: "JavaScript",
          rate: "$80",
          title: "Performance Optimization",
          difficulty: "Advanced",
          matchPercentage: 92,
          description:
            "Optimize load times and runtime performance for a JavaScript-heavy application...",
        },
        {
          tag: "React Native",
          rate: "$110",
          title: "Mobile App Features",
          difficulty: "Intermediate",
          matchPercentage: 85,
          description:
            "Add new features to an existing React Native application with clean architecture...",
        },
      ];

      setPersonalizedTasks(mockPersonalizedTasks);
    }
  }, []);

  // Check if sections are in view
  const howItWorksInView = useInView(howItWorksRef, {
    once: true,
    amount: 0.3,
  });
  const featuredTasksInView = useInView(featuredTasksRef, {
    once: true,
    amount: 0.3,
  });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.3,
  });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-950">
      {/* Animated Cubes Background with optimized performance */}
      <AnimatedCubes count={25} performance="low" />

      {/* Profile Completion Reminder */}
      <AnimatePresence>
        {showProfileReminder && isLoggedIn && (
          <ProfileCompletionReminder onClose={handleCloseReminder} />
        )}
      </AnimatePresence>

      {/* Hero Section - Conditional content based on login status */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-indigo-950 to-indigo-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {isLoggedIn ? (
              <>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4 text-4xl font-bold text-slate-50"
                >
                  Welcome Back to Code & Cash!
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-8 text-xl text-slate-300"
                >
                  We've found new tasks that match your profile. Ready to start
                  earning?
                </motion.p>
                <motion.div
                  className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/exploretask"
                    className="inline-block px-8 py-3 text-lg font-medium bg-indigo-600 rounded-md shadow-lg text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
                  >
                    Explore Tasks
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-block px-8 py-3 text-lg font-medium text-indigo-300 border border-indigo-500 rounded-md shadow-lg hover:bg-indigo-800/30 hover:text-indigo-200"
                  >
                    Update Profile
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4 text-4xl font-bold text-slate-50"
                >
                  Connect, Code, and Earn
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-8 text-xl text-slate-300"
                >
                  code & cash connects talented developers with companies
                  needing coding help. Save time, get paid, build your
                  portfolio.
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/signup"
                    className="inline-block px-8 py-3 text-lg font-medium bg-indigo-600 rounded-md shadow-lg text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
                  >
                    Join Now Free
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Personalized Tasks Section - Only shown to logged in users */}
      {isLoggedIn && (
        <div className="relative z-20 py-8 bg-gradient-to-b from-indigo-950 to-indigo-900">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 border border-indigo-700 rounded-lg shadow-lg bg-indigo-900/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Recommended For You
                  </h2>
                  <p className="text-indigo-300">
                    Tasks matching your skills and preferences
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/my-tasks">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-purple-600/60 hover:bg-purple-600"
                    >
                      My Applied Tasks
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-indigo-600/60 hover:bg-indigo-600"
                  >
                    View All Matches
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {personalizedTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="overflow-hidden transition-all duration-300 border border-indigo-600 rounded-lg shadow-lg bg-gradient-to-br from-indigo-800 to-indigo-900 hover:shadow-xl hover:shadow-indigo-900/40"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium text-indigo-200 rounded-full bg-indigo-700/60">
                          {task.tag}
                        </span>
                        <span className="text-lg font-bold text-yellow-400">
                          {task.rate}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="mb-1 text-lg font-semibold text-white">
                          {task.title}
                        </h3>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-indigo-300">
                            {task.difficulty}
                          </span>
                          <div className="flex items-center">
                            <span className="mr-1 text-xs font-medium text-indigo-300">
                              Match:
                            </span>
                            <span className="text-sm font-bold text-green-400">
                              {task.matchPercentage}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-indigo-800 rounded-full">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-500"
                            style={{ width: `${task.matchPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="mb-4 text-sm text-indigo-200">
                        {task.description}
                      </p>

                      <div className="flex justify-end mt-2">
                        <motion.button
                          whileHover={{ scale: 1.05, x: 3 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
                        >
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* How it Works Section - Only shown to non-logged in users */}
      {!isLoggedIn && (
        <div
          ref={howItWorksRef}
          className="relative z-10 py-16 bg-indigo-900"
          id="how-it-works"
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.h2
              {...fadeInUp}
              animate={howItWorksInView ? "animate" : "initial"}
              className="mb-12 text-3xl font-bold text-center text-slate-50"
            >
              How code & cash Works
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={howItWorksInView ? "animate" : "initial"}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {[
                {
                  title: "Create an Account",
                  description:
                    "Sign up as a developer or business user to get started using coding journey",
                },
                {
                  title: "Find or Post Tasks",
                  description:
                    "Browse or create coding tasks with clear requirements",
                },
                {
                  title: "Complete & Get Paid",
                  description:
                    "Submit your solution, get approved and receive payment directly to your account",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 transition-shadow duration-300 border rounded-lg shadow-md bg-indigo-800/70 backdrop-blur-sm border-slate-600 hover:shadow-xl hover:shadow-indigo-900/20"
                >
                  <div className="mb-4 text-xl font-semibold text-indigo-400">
                    {step.title}
                  </div>
                  <p className="text-slate-300">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Featured Tasks Section */}
      <div
        ref={featuredTasksRef}
        className="relative z-10 py-16 bg-gradient-to-b from-indigo-900 to-indigo-800"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuredTasksInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-50">Featured Tasks</h2>
            <Link
              to="/exploretask"
              className="text-indigo-400 hover:text-indigo-300"
            >
              View All Tasks
            </Link>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={featuredTasksInView ? "animate" : "initial"}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                tag: "ReactJS",
                rate: "$75",
                title: "Build a React Component Library",
                description:
                  "Create reusable component library with full documentation...",
              },
              {
                tag: "Node.js",
                rate: "$90",
                title: "API Integration for Payment Gateway",
                description:
                  "Implement secure payment processing using Stripe API...",
              },
              // Add a third featured task
              {
                tag: "Vue.js",
                rate: "$85",
                title: "E-commerce Dashboard",
                description:
                  "Build a responsive admin dashboard with Vue.js and Tailwind...",
              },
            ].map((task, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="overflow-hidden transition-shadow duration-300 border rounded-lg shadow-md bg-indigo-900/70 backdrop-blur-sm border-slate-600 hover:shadow-xl hover:shadow-indigo-900/30"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-sm text-indigo-400 rounded-full bg-indigo-600/30">
                      {task.tag}
                    </span>
                    <span className="text-yellow-500">{task.rate}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-50">
                    {task.title}
                  </h3>
                  <p className="mb-4 text-slate-300">{task.description}</p>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <Link
                      to={`/task-details/${index + 1}`}
                      className="flex items-center text-cyan-500 hover:text-cyan-400"
                    >
                      View Task <span className="ml-1">→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        ref={testimonialsRef}
        className="relative z-10 py-16 bg-gradient-to-b from-indigo-800 to-indigo-900"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
            animate={testimonialsInView ? "animate" : "initial"}
            className="mb-12 text-3xl font-bold text-center text-slate-50"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={testimonialsInView ? "animate" : "initial"}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <motion.div
              variants={fadeInUp}
              className="p-6 transition-all duration-300 border rounded-lg shadow-lg border-slate-600 bg-indigo-800/50 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-900/30"
            >
              <p className="mb-4 text-slate-300">
                "I found my ideal tasks quickly. The platform's easy to use and
                payments are always on time."
              </p>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-indigo-400">
                    David Johnson
                  </div>
                  <div className="text-sm text-slate-400">
                    Frontend Developer
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="p-6 transition-all duration-300 border rounded-lg shadow-lg border-slate-600 bg-indigo-800/50 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-900/30"
            >
              <p className="mb-4 text-slate-300">
                "As a tech startup, finding reliable developers was a challenge.
                code & cash made it simple and efficient."
              </p>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-indigo-400">
                    Michael Chen
                  </div>
                  <div className="text-sm text-slate-400">
                    Tech Startup Founder
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className="relative z-10 py-16 bg-gradient-to-t from-indigo-950 to-indigo-900"
      >
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold text-slate-50"
          >
            Ready to Start Your Coding Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-slate-300"
          >
            Join thousands of developers earning income on code & cash
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="px-8 py-3 text-lg font-medium transition-all duration-300 bg-yellow-500 rounded-md shadow-lg text-indigo-950 hover:bg-yellow-400 shadow-yellow-500/20"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
