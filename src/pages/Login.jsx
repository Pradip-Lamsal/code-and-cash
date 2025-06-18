import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedCubes from "../components/AnimatedCubes";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1a1b4b] p-4">
      <AnimatedCubes count={10} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1200px] h-[700px] rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)] flex overflow-hidden"
      >
        {/* Left side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-1/2 p-12 flex flex-col justify-center bg-[#1a1b4b] text-white relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-white mb-1">Welcome back!</h2>
            <p className="text-gray-300 text-sm">
              Enter to get unlimited access to data & information.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#2a2b5b] border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-white placeholder-gray-400"
                placeholder="Enter your mail address"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#2a2b5b] border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-white placeholder-gray-400"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-[#2a2b5b] border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-sm text-purple-400 hover:underline"
              >
                Forgot your password?
              </motion.a>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Log in
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#1a1b4b] text-sm text-gray-400">
                    Or Login with
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-[#2a2b5b] transition duration-200 flex items-center justify-center space-x-2"
                disabled
              >
                <span className="text-xl">G</span>
                <span>Sign up with google</span>
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center text-sm text-gray-400 mt-4 mb-5"
            >
              Don't have an account?{" "}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/Signup"
                className="text-purple-400 hover:underline"
              >
                Register here
              </motion.a>
            </motion.p>
          </form>
        </motion.div>

        {/* Right side - Login Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-1/2 relative overflow-hidden"
        >
          <img
            src="/login.png"
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
