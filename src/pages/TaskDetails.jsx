import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Floating,
  ScrollReveal,
  ScrollRevealGroup,
} from "../components/ScrollAnimation";
import { fadeInLeft, fadeInRight, fadeInUp } from "../components/animations";

const TaskDetails = () => {
  const { id } = useParams();
  console.log("Task ID from URL:", id);

  // Mock data for different tasks
  const tasksData = {
    1: {
      id: 1,
      title: "Build a React Component Library",
      company: "TechCorp Inc.",
      postedDate: "2023-06-15",
      deadline: "5 days",
      location: "Remote",
      estimatedTime: "20-30 hours",
      applicants: "7 developers",
      payout: 250,
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
    },
    2: {
      id: 2,
      title: "API Integration for Payment Gateway",
      company: "DataSys",
      postedDate: "2023-06-17",
      deadline: "7 days",
      location: "Remote",
      estimatedTime: "15-25 hours",
      applicants: "5 developers",
      payout: 300,
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
      requiredSkills: [
        "Node.js",
        "Express",
        "Stripe API",
        "Payment Processing",
      ],
    },
    3: {
      id: 3,
      title: "E-commerce Dashboard with Vue.js",
      company: "ShopSmart",
      postedDate: "2023-06-18",
      deadline: "10 days",
      location: "Remote",
      estimatedTime: "30-40 hours",
      applicants: "3 developers",
      payout: 400,
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
    },
  };

  // Get the task data based on the id parameter
  const task = tasksData[id];

  // If no task found with the given ID
  if (!task) {
    return (
      <div className="min-h-screen bg-navy py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/exploretask"
            className="text-indigo hover:text-indigo-hover flex items-center mb-6"
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
            Back to Tasks
          </Link>

          <div className="bg-navy-light rounded-lg shadow-lg p-8 text-center border border-border">
            <svg
              className="w-16 h-16 mx-auto text-indigo mb-4 opacity-60"
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
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Task Not Found
            </h1>
            <p className="text-text-secondary mb-6">
              The task you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/exploretask"
              className="bg-indigo text-text-primary px-4 py-2 rounded-md hover:bg-indigo-hover inline-block shadow-md shadow-indigo/20"
            >
              Browse Available Tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <ScrollReveal variant={fadeInLeft} delay={0.2}>
          <Link
            to="/exploretask"
            className="text-indigo hover:text-indigo-hover flex items-center"
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
            Back to Tasks
          </Link>
        </ScrollReveal>

        {/* Task Header */}
        <ScrollReveal variant={fadeInUp} delay={0.3} className="mt-6">
          <div className="bg-navy-light rounded-lg shadow-lg p-6 border border-border">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {task.title}
                </h1>
                <p className="text-text-secondary">Posted by: {task.company}</p>
              </div>
              <Floating>
                <div className="text-2xl font-bold text-accent-yellow">
                  ${task.payout}
                </div>
              </Floating>
            </div>
          </div>
        </ScrollReveal>

        {/* Task Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ScrollReveal variant={fadeInLeft} delay={0.4}>
            <div className="bg-navy-light rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold mb-4 text-text-primary">
                Task Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Posted Date</span>
                  <span className="text-text-primary">{task.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Deadline</span>
                  <span className="text-text-primary">{task.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Location</span>
                  <span className="text-text-primary">{task.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Estimated Time</span>
                  <span className="text-text-primary">
                    {task.estimatedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Current Applicants
                  </span>
                  <span className="text-text-primary">{task.applicants}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant={fadeInRight} delay={0.4}>
            <div className="bg-navy-light rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold mb-4 text-text-primary">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {task.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo bg-opacity-20 text-indigo px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Requirements */}
        <ScrollReveal variant={fadeInUp} delay={0.5} className="mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Requirements</h2>
            <ScrollRevealGroup staggerDelay={0.1}>
              {task.requirements.map((req, index) => (
                <div key={index} className="flex items-start py-2">
                  <svg
                    className="w-5 h-5 mr-2 text-status-success mt-0.5"
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
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>

        {/* Deliverables */}
        <ScrollReveal variant={fadeInUp} delay={0.6} className="mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Deliverables</h2>
            <ScrollRevealGroup staggerDelay={0.1}>
              {task.deliverables.map((del, index) => (
                <div key={index} className="flex items-start py-2">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500 mt-0.5"
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
                  <span className="text-gray-700">{del}</span>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>

        {/* Apply Button */}
        <ScrollReveal
          variant={fadeInUp}
          delay={0.7}
          className="mt-8 flex justify-end"
        >
          <Link to={`/applytask/${id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple text-text-primary px-8 py-3 rounded-md hover:bg-purple-hover transition-colors"
            >
              Apply for This Task
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default TaskDetails;
