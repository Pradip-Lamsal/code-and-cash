import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import AnimatedCubes from "../components/AnimatedCubes";

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
  
  // Check if sections are in view
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const featuredTasksInView = useInView(featuredTasksRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-950">
      {/* Animated Cubes Background with optimized performance */}
      <AnimatedCubes count={25} performance="low" />

      {/* Hero Section */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-indigo-950 to-indigo-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                className="inline-block px-8 py-3 text-lg font-medium bg-indigo-600 rounded-md shadow-lg text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
              >
                Join Now Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How it Works Section */}
      <div ref={howItWorksRef} className="relative z-10 py-16 bg-indigo-900" id="how-it-works">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
            animate={howItWorksInView ? "animate" : "initial"}
            className="mb-12 text-3xl font-bold text-center text-slate-50"
          >
            How Code and Cash Works
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

      {/* Featured Tasks Section */}
      <div ref={featuredTasksRef} className="relative z-10 py-16 bg-gradient-to-b from-indigo-900 to-indigo-800">
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
                rate: "$75/hour",
                title: "Build a React Component Library",
                description:
                  "Create reusable component library with full documentation...",
              },
              {
                tag: "Node.js",
                rate: "$90/hour",
                title: "API Integration for Payment Gateway",
                description:
                  "Implement secure payment processing using Stripe API...",
              },
              // Add a third featured task
              {
                tag: "Vue.js",
                rate: "$85/hour",
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
      <div ref={testimonialsRef} className="relative z-10 py-16 bg-gradient-to-b from-indigo-800 to-indigo-900">
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
                Code and Cash made it simple and efficient."
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
      <div ref={ctaRef} className="relative z-10 py-16 bg-gradient-to-t from-indigo-950 to-indigo-900">
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
            Join thousands of developers earning income on Code and Cash
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
