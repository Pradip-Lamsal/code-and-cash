import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const filterCategories = [
  { id: "all", label: "All Tasks" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "mobile", label: "Mobile" },
];

const difficulties = [
  { id: "all", label: "All Difficulties" },
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

const PriceRangeSlider = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium text-text-primary mb-4">Price Range</h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="5000"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer accent-indigo"
        />
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">$0</span>
          <span className="text-accent-yellow font-medium">${value}</span>
          <span className="text-text-secondary">$5000</span>
        </div>
      </div>
    </div>
  );
};

const SidebarFilter = ({ title, options, selected, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium text-text-primary mb-4">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selected === option.id
                ? "bg-indigo bg-opacity-20 text-indigo"
                : "text-text-secondary hover:bg-navy-light"
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-navy-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border border-border"
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo bg-opacity-20">
          <span className="text-sm font-medium text-indigo">
            {task.company[0]}
          </span>
        </div>
        <span className="ml-3 font-medium text-text-primary">
          {task.company}
        </span>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`ml-auto px-3 py-1 rounded-full text-sm ${
            task.difficulty === "Easy"
              ? "bg-status-success bg-opacity-20 text-status-success"
              : task.difficulty === "Medium"
              ? "bg-indigo bg-opacity-20 text-indigo"
              : "bg-accent-yellow bg-opacity-20 text-accent-yellow"
          }`}
        >
          {task.difficulty}
        </motion.span>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-text-primary">
        {task.title}
      </h3>
      <p className="text-text-secondary mb-4">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="text-accent-yellow font-semibold">${task.payout}</div>
        <div className="text-text-secondary flex items-center">
          <svg
            className="w-4 h-4 mr-1"
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
          {task.duration} days
        </div>
      </div>
      <Link to={`/task-details/${task.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-indigo text-text-primary py-2 rounded-md hover:bg-indigo-hover transition-colors shadow-sm shadow-indigo/20"
        >
          View Details
        </motion.button>
      </Link>
    </motion.div>
  );
};

const Exploretask = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [tasks] = useState([
    {
      id: 1,
      company: "TechCorp",
      title: "Build a React Component Library",
      description:
        "Create a comprehensive React component library with documentation and testing",
      difficulty: "Medium",
      payout: 250,
      duration: 5,
      category: "frontend",
    },
    {
      id: 2,
      company: "DataSys",
      title: "API Integration for Payment Gateway",
      description:
        "Integrate Stripe payment gateway with existing Node.js backend",
      difficulty: "Hard",
      payout: 300,
      duration: 7,
      category: "backend",
    },
    {
      id: 3,
      company: "MobileFirst",
      title: "Bug Fix: Mobile App Checkout",
      description: "Fix responsive design issues on the checkout page",
      difficulty: "Easy",
      payout: 100,
      duration: 2,
      category: "mobile",
    },
    {
      id: 4,
      company: "WebSolutions",
      title: "Database Optimization",
      description: "Optimize MongoDB queries for better performance",
      difficulty: "Medium",
      payout: 200,
      duration: 4,
      category: "backend",
    },
    {
      id: 5,
      company: "SecureAuth",
      title: "Authentication System Implementation",
      description: "Implement JWT authentication with refresh tokens",
      difficulty: "Hard",
      payout: 350,
      duration: 6,
      category: "backend",
    },
    {
      id: 6,
      company: "DesignCo",
      title: "Landing Page Design",
      description: "Create a responsive landing page using Tailwind CSS",
      difficulty: "Easy",
      payout: 150,
      duration: 3,
      category: "frontend",
    },
  ]);

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      task.difficulty.toLowerCase() === selectedDifficulty;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = task.payout <= maxPrice;

    return (
      matchesCategory && matchesDifficulty && matchesSearch && matchesPrice
    );
  });

  return (
    <div className="min-h-screen bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary">
            Explore Tasks
          </h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-md border border-border bg-navy-light text-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-hover placeholder:text-text-secondary"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1"
          >
            <div className="bg-navy-light rounded-lg p-6 shadow-md border border-border">
              <SidebarFilter
                title="Categories"
                options={filterCategories}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
              <SidebarFilter
                title="Difficulty"
                options={difficulties}
                selected={selectedDifficulty}
                onChange={setSelectedDifficulty}
              />
              <PriceRangeSlider value={maxPrice} onChange={setMaxPrice} />
            </div>
          </motion.div>

          <div className="col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${selectedDifficulty}-${searchQuery}-${maxPrice}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TaskCard key={task.id} task={task} index={index} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-2 text-center py-12"
                  >
                    <p className="text-text-secondary text-lg">
                      No tasks match your filters.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exploretask;
