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

  // This would typically come from an API call using the id
  const task = {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <ScrollReveal variant={fadeInLeft} delay={0.2}>
          <Link
            to="/explore"
            className="text-blue-600 hover:text-blue-700 flex items-center"
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
        </ScrollReveal>

        {/* Task Header */}
        <ScrollReveal variant={fadeInUp} delay={0.3} className="mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {task.title}
                </h1>
                <p className="text-gray-600">Posted by: {task.company}</p>
              </div>
              <Floating>
                <div className="text-2xl font-bold text-green-600">
                  ${task.payout}
                </div>
              </Floating>
            </div>
          </div>
        </ScrollReveal>

        {/* Task Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ScrollReveal variant={fadeInLeft} delay={0.4}>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Task Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted Date</span>
                  <span>{task.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span>{task.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span>{task.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time</span>
                  <span>{task.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Applicants</span>
                  <span>{task.applicants}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant={fadeInRight} delay={0.4}>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {task.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
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
                    className="w-5 h-5 mr-2 text-green-500 mt-0.5"
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
          <Link to={`/apply/${id}/success`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
