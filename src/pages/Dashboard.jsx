import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Connect, Code, and Earn
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8"
            >
              Code and Cash connects talented developers with companies needing
              coding help. Save time, get paid, build your portfolio.
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
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 inline-block"
              >
                Join Now Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-16" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            How Code and Cash Works
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 text-xl font-semibold mb-4">
                  {step.title}
                </div>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Tasks Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Featured Tasks</h2>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              View All Tasks
            </Link>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                tag: "ReactJS",
                tagColor: "blue",
                rate: "$75/hour",
                title: "Build a React Component Library",
                description:
                  "Create reusable component library with full documentation...",
              },
              {
                tag: "Node.js",
                tagColor: "green",
                rate: "$90/hour",
                title: "API Integration for Payment Gateway",
                description:
                  "Implement secure payment processing using Stripe API...",
              },
              // Add a third featured task
              {
                tag: "Vue.js",
                tagColor: "emerald",
                rate: "$85/hour",
                title: "E-commerce Dashboard",
                description:
                  "Build a responsive admin dashboard with Vue.js and Tailwind...",
              },
            ].map((task, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`bg-${task.tagColor}-100 text-${task.tagColor}-800 px-3 py-1 rounded-full text-sm`}
                    >
                      {task.tag}
                    </span>
                    <span className="text-gray-600">{task.rate}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                      View Task →
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "I found my ideal tasks quickly. The platform's easy to use and
                payments are always on time."
              </p>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-900">
                    David Johnson
                  </div>
                  <div className="text-gray-600 text-sm">
                    Frontend Developer
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "As a tech startup, finding reliable developers was a challenge.
                Code and Cash made it simple and efficient."
              </p>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-900">
                    Michael Chen
                  </div>
                  <div className="text-gray-600 text-sm">
                    Tech Startup Founder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of developers earning income on Code and Cash
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
