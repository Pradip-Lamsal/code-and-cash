import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hide header on login and signup pages
  const hideOnPaths = ["/login", "/signup", "/Login", "/Signup"];
  const shouldHideHeader = hideOnPaths.includes(location.pathname);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/exploretask", label: "Explore Tasks" },
    { to: "/help", label: "Help" },
    { to: "/#about", label: "About Us" },
    { to: "/admin/task-management", label: "Admin" },
  ];

  return shouldHideHeader ? null : (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b shadow-md bg-indigo-950 border-slate-600 bg-opacity-95 backdrop-blur-sm"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xl font-semibold text-indigo-400"
              >
                Code and Cash
              </motion.span>
            </Link>
          </div>

          {/* Navigation Links - Middle */}
          <div className="items-center justify-center flex-1 hidden mx-8 md:flex">
            <div className="flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="transition-colors text-slate-50 hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="items-center hidden space-x-4 md:flex"
          >
            {/* Profile Icon */}
            <Link
              to="/profile"
              className="transition-colors text-slate-300 hover:text-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
            </Link>
            <Link
              to="/login"
              className="transition-colors text-slate-300 hover:text-slate-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 transition-colors bg-indigo-600 rounded-md shadow-md text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
            >
              Sign Up
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md md:hidden text-slate-300 hover:text-slate-50 hover:bg-indigo-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-indigo-900 border-t md:hidden border-slate-600"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <Link
                    to={link.to}
                    className="block px-3 py-2 rounded-md text-slate-300 hover:text-slate-50 hover:bg-indigo-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Profile Link in Mobile Menu */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-slate-300 hover:text-slate-50 hover:bg-indigo-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
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
                  Profile
                </Link>
              </motion.div>

              <div className="flex flex-col px-3 mt-4 space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-center text-slate-300 hover:text-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-center bg-indigo-600 rounded-md shadow-md text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
