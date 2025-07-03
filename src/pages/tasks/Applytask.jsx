import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Applytask = () => {
  // Get task ID from URL parameters (if available)
  const { id } = useParams();
  console.log("Applying for task ID:", id);
  // Mock data for the application
  const applicationData = {
    taskTitle: "Build a React Component Library",
    payout: "$250",
    applicationId: "APP-17495440978169",
    submittedAt: "6/10/2025, 1:21:10 PM",
    expectedResponse: "2-3 business days",
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const steps = [
    "Task provider will review your application",
    "You'll receive an email notification about the decision",
    "If selected, you'll get access to detailed requirements",
    "Complete the task within the specified deadline",
  ];

  return (
    <div className="min-h-screen bg-indigo-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="text-cyan-500 hover:text-cyan-400 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-indigo-900 backdrop-blur-sm rounded-lg shadow-lg shadow-indigo-900/50 p-6 mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 bg-indigo-800/50 rounded-full flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-status-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-2xl font-bold text-center text-slate-50 mb-2"
          >
            Application Submitted Successfully!
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-center text-slate-300"
          >
            Your application has been sent to the task provider for review.
          </motion.p>
        </motion.div>

        {/* Application Details */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="bg-indigo-900 backdrop-blur-sm rounded-lg shadow-lg shadow-indigo-900/50 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-50">
            Application Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-300">Task Title</span>
              <span className="font-medium text-slate-50">
                {applicationData.taskTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Payout</span>
              <span className="text-green-400 font-medium">
                {applicationData.payout}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Application ID</span>
              <div className="flex items-center">
                <span className="font-medium text-slate-50">
                  {applicationData.applicationId}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-2 text-slate-400 hover:text-slate-200"
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
                      strokeWidth="2"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Submitted At</span>
              <span className="font-medium text-slate-50">
                {applicationData.submittedAt}
              </span>
            </div>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="bg-indigo-900 backdrop-blur-sm rounded-lg shadow-lg shadow-indigo-900/50 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center text-slate-50">
            <svg
              className="w-5 h-5 mr-2 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            What Happens Next?
          </h2>
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start"
              >
                <svg
                  className="w-5 h-5 mr-2 text-indigo-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-300">{step}</span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-sm text-slate-400"
          >
            Expected Response Time: {applicationData.expectedResponse}
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="bg-indigo-900 backdrop-blur-sm rounded-lg shadow-lg shadow-indigo-900/50 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-50">
            Contact Information
          </h2>
          <p className="text-slate-300 mb-4">
            Provide your contact details for faster communication regarding this
            application.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-indigo-800/50 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 bg-indigo-800/50 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-50"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-slate-300 hover:text-slate-50"
            >
              Skip for Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-indigo-600 text-slate-50 px-4 py-2 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
            >
              Save Contact Info
            </motion.button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center"
        >
          <Link to={`/task-details/${id || 1}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-cyan-500 hover:text-cyan-400"
            >
              View Task Details
            </motion.button>
          </Link>
          <Link to="/exploretask">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-indigo-600 text-slate-50 px-4 py-2 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
            >
              Browse More Tasks
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Applytask;
