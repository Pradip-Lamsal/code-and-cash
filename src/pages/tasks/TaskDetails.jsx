import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

// Enhanced animation variants for consistent motion design
const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Enhanced task data with better structure and more details
const TASKS_DATABASE = {
  1: {
    id: 1,
    title: "Build a React Component Library",
    company: "TechCorp Inc.",
    companyLogo: "TC",
    postedDate: "2023-06-15",
    deadline: "5 days",
    location: "Remote",
    estimatedTime: "20-30 hours",
    applicants: "7 developers",
    payout: 250,
    difficulty: "Medium",
    urgency: "High",
    category: "Frontend",
    overview:
      "We need a comprehensive React component library that follows our design system. The components should be well-documented, accessible, and thoroughly tested.",
    requirements: [
      "Button (primary, secondary, outline, ghost)",
      "Input fields (text, number, email, password)",
      "Select dropdown",
      "Modal/Dialog",
      "Tabs",
      "Card",
      "Table",
      "Pagination",
      "All components must be:",
      "Fully responsive",
      "Accessible (WCAG 2.1 AA compliant)",
      "Well-documented with Storybook",
      "Thoroughly tested with Jest and React Testing Library",
      "Use TypeScript for type safety",
      "Implement a theming system that supports light and dark mode",
    ],
    deliverables: [
      "Source code in a GitHub repository",
      "Storybook documentation",
      "Installation and usage instructions",
      "Test coverage report",
    ],
    requiredSkills: ["React", "TypeScript", "UI/UX", "Testing"],
    benefits: [
      "Work with cutting-edge technology",
      "Flexible working hours",
      "Code review and mentorship",
      "Portfolio addition",
    ],
  },
  2: {
    id: 2,
    title: "API Integration for Payment Gateway",
    company: "DataSys",
    companyLogo: "DS",
    postedDate: "2023-06-17",
    deadline: "7 days",
    location: "Remote",
    estimatedTime: "15-25 hours",
    applicants: "5 developers",
    payout: 300,
    difficulty: "Hard",
    urgency: "Medium",
    category: "Backend",
    overview:
      "We need to integrate Stripe payment gateway with our existing Node.js backend to enable secure payment processing for our e-commerce platform.",
    requirements: [
      "Implement Stripe API for payment processing",
      "Handle payment intents and confirmations",
      "Set up webhook handling for payment events",
      "Implement proper error handling and logging",
      "Create test suite for payment flows",
      "Document API endpoints",
    ],
    deliverables: [
      "Integration code with proper documentation",
      "Test suite covering major payment scenarios",
      "Security audit report",
      "Implementation guide for frontend integration",
    ],
    requiredSkills: ["Node.js", "Express", "Stripe API", "Payment Processing"],
    benefits: [
      "Learn payment processing",
      "Security best practices",
      "API design experience",
      "Financial technology exposure",
    ],
  },
  3: {
    id: 3,
    title: "E-commerce Dashboard with Vue.js",
    company: "ShopSmart",
    companyLogo: "SS",
    postedDate: "2023-06-18",
    deadline: "10 days",
    location: "Remote",
    estimatedTime: "30-40 hours",
    applicants: "3 developers",
    payout: 400,
    difficulty: "Medium",
    urgency: "Low",
    category: "Full Stack",
    overview:
      "Create a responsive admin dashboard for our e-commerce platform using Vue.js and Tailwind CSS with data visualization components.",
    requirements: [
      "Sales overview with charts and graphs",
      "Order management interface",
      "Customer data and analytics",
      "Inventory management",
      "User role management",
      "Dark/light theme support",
    ],
    deliverables: [
      "Complete Vue.js dashboard application",
      "Component documentation",
      "User guide for admin staff",
    ],
    requiredSkills: ["Vue.js", "Tailwind CSS", "Chart.js", "UX Design"],
    benefits: [
      "Vue.js ecosystem experience",
      "Data visualization skills",
      "Dashboard design patterns",
      "E-commerce domain knowledge",
    ],
  },
};

//...existing code...

// Helper Components for better code organization
const DifficultyBadge = ({ difficulty }) => {
  const getDifficultyStyle = (level) => {
    const styles = {
      Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Hard: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return styles[level] || styles.Easy;
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyStyle(
        difficulty
      )}`}
    >
      {difficulty}
    </span>
  );
};

const UrgencyIndicator = ({ urgency }) => {
  const getUrgencyStyle = (level) => {
    const styles = {
      Low: "bg-blue-500/20 text-blue-400",
      Medium: "bg-orange-500/20 text-orange-400",
      High: "bg-red-500/20 text-red-400",
    };
    return styles[level] || styles.Low;
  };

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-lg ${getUrgencyStyle(
        urgency
      )}`}
    >
      <div className="w-2 h-2 mr-2 bg-current rounded-full"></div>
      <span className="text-sm font-medium">{urgency} Priority</span>
    </div>
  );
};

const InfoCard = ({ icon, label, value, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`flex items-center justify-between p-4 rounded-lg bg-navy border border-border hover:border-indigo/30 transition-all ${className}`}
  >
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-indigo/20">
        {icon}
      </div>
      <span className="text-text-secondary">{label}</span>
    </div>
    <span className="font-semibold text-text-primary">{value}</span>
  </motion.div>
);

const SkillTag = ({ skill, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="px-4 py-2 text-sm font-medium transition-colors border rounded-full bg-gradient-to-r from-indigo/20 to-purple-600/20 text-indigo border-indigo/30 hover:border-indigo/50"
  >
    {skill}
  </motion.span>
);

// Main Component
const TaskDetails = () => {
  const { id } = useParams();

  // Get the task data based on the id parameter
  const task = TASKS_DATABASE[id];

  // Enhanced Error/Not Found State
  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <motion.div {...ANIMATION_VARIANTS.fadeInLeft} className="mb-8">
            <Link
              to="/exploretask"
              className="flex items-center transition-colors text-indigo hover:text-indigo-hover group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
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
              Back to Tasks
            </Link>
          </motion.div>

          <motion.div
            {...ANIMATION_VARIANTS.scaleIn}
            className="p-12 text-center border shadow-2xl rounded-2xl bg-navy-light/50 backdrop-blur border-border"
          >
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo/20 to-purple-600/20">
              <svg
                className="w-12 h-12 text-indigo"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-indigo to-purple-600 bg-clip-text">
              Task Not Found
            </h1>
            <p className="max-w-md mx-auto mb-8 text-lg text-text-secondary">
              The task you're looking for doesn't exist or has been removed.
              Let's get you back to browsing amazing opportunities!
            </p>
            <Link to="/exploretask">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 font-medium text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-indigo to-purple-600 hover:shadow-xl hover:shadow-indigo/25"
              >
                Browse Available Tasks
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Enhanced Back Navigation */}
        <motion.div {...ANIMATION_VARIANTS.fadeInLeft} className="mb-8">
          <Link
            to="/exploretask"
            className="flex items-center transition-colors text-indigo hover:text-indigo-hover group"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
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
            Back to Tasks
          </Link>
        </motion.div>

        {/* Enhanced Task Header */}
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          className="p-8 mb-8 border shadow-2xl rounded-2xl bg-gradient-to-r from-navy-light/50 to-navy/50 backdrop-blur border-border"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-16 h-16 mr-4 shadow-lg rounded-xl bg-gradient-to-r from-indigo to-purple-600"
                >
                  <span className="text-xl font-bold text-white">
                    {task.companyLogo}
                  </span>
                </motion.div>
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-indigo to-purple-600 bg-clip-text">
                    {task.title}
                  </h1>
                  <p className="text-lg text-text-secondary">
                    Posted by{" "}
                    <span className="font-semibold text-text-primary">
                      {task.company}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <DifficultyBadge difficulty={task.difficulty} />
                <UrgencyIndicator urgency={task.urgency} />
                <span className="px-3 py-1 text-sm font-medium rounded-lg bg-indigo/20 text-indigo">
                  {task.category}
                </span>
              </div>

              <p className="text-lg leading-relaxed text-text-secondary">
                {task.overview}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center lg:text-right"
            >
              <div className="p-6 border rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
                <div className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  ${task.payout.toLocaleString()}
                </div>
                <p className="text-text-secondary">Total Payout</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Task Information Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <motion.div
            {...ANIMATION_VARIANTS.fadeInLeft}
            transition={{ delay: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            <h2 className="flex items-center mb-6 text-2xl font-bold text-text-primary">
              <span className="mr-3">📋</span>
              Task Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoCard
                icon={
                  <svg
                    className="w-5 h-5 text-indigo"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                label="Posted Date"
                value={task.postedDate}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Deadline"
                value={task.deadline}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                label="Location"
                value={task.location}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Estimated Time"
                value={task.estimatedTime}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                }
                label="Applicants"
                value={task.applicants}
                className="md:col-span-2"
              />
            </div>
          </motion.div>

          <motion.div
            {...ANIMATION_VARIANTS.fadeInRight}
            transition={{ delay: 0.3 }}
          >
            <h2 className="flex items-center mb-6 text-2xl font-bold text-text-primary">
              <span className="mr-3">🔧</span>
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {task.requiredSkills.map((skill, index) => (
                <SkillTag key={skill} skill={skill} index={index} />
              ))}
            </div>

            {/* Benefits Section */}
            <div className="mt-8">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
                <span className="mr-2">✨</span>
                What You'll Gain
              </h3>
              <div className="space-y-2">
                {task.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-text-secondary"
                  >
                    <div className="w-2 h-2 mr-3 rounded-full bg-indigo"></div>
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Requirements */}
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          transition={{ delay: 0.4 }}
          className="p-8 mb-8 border shadow-xl rounded-2xl bg-navy-light/50 backdrop-blur border-border"
        >
          <h2 className="flex items-center mb-6 text-2xl font-bold text-text-primary">
            <span className="mr-3">📝</span>
            Requirements
          </h2>
          <motion.div
            {...ANIMATION_VARIANTS.staggerContainer}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {task.requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start p-4 transition-colors border rounded-lg bg-navy/50 border-border hover:border-indigo/30"
              >
                <svg
                  className="w-5 h-5 mr-3 text-emerald-400 mt-0.5 flex-shrink-0"
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
                <span className="text-text-primary">{req}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Deliverables */}
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          transition={{ delay: 0.5 }}
          className="p-8 mb-8 border shadow-xl rounded-2xl bg-navy-light/50 backdrop-blur border-border"
        >
          <h2 className="flex items-center mb-6 text-2xl font-bold text-text-primary">
            <span className="mr-3">📦</span>
            Deliverables
          </h2>
          <motion.div
            {...ANIMATION_VARIANTS.staggerContainer}
            className="space-y-4"
          >
            {task.deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-4 transition-colors border rounded-lg bg-gradient-to-r from-indigo/10 to-purple-600/10 border-indigo/20 hover:border-indigo/40"
              >
                <svg
                  className="w-5 h-5 mr-3 text-indigo mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="font-medium text-text-primary">
                  {deliverable}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Apply Button */}
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-between gap-6 p-8 border sm:flex-row rounded-2xl bg-gradient-to-r from-indigo/10 to-purple-600/10 border-indigo/20"
        >
          <div>
            <h3 className="mb-2 text-xl font-bold text-text-primary">
              Ready to take on this challenge?
            </h3>
            <p className="text-text-secondary">
              Join {task.applicants} who have already applied for this exciting
              opportunity.
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 transition-colors border rounded-xl border-border text-text-secondary hover:text-text-primary hover:border-indigo/50"
            >
              Save for Later
            </motion.button>
            <Link to={`/applytask/${task._id || id}`}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-3 font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-indigo to-purple-600 hover:shadow-xl hover:shadow-indigo/25"
              >
                Apply for This Task
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetails;
